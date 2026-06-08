import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

// --- Simple in-memory rate limit: 3 requests / minute / IP ---
const WINDOW_MS = 60_000;
const MAX_REQUESTS = 3;
const hits = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > MAX_REQUESTS;
}

function clean(value: unknown, max = 200): string {
  return String(value ?? "")
    // strip ASCII control characters (U+0000–U+001F, U+007F)
    .replace(/[\x00-\x1F\x7F]/g, "")
    .trim()
    .slice(0, max);
}

export async function POST(req: NextRequest) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown";

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Слишком много заявок. Попробуйте через минуту." },
      { status: 429 },
    );
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Некорректный запрос." }, { status: 400 });
  }

  // Honeypot — bots fill hidden fields. Pretend success, send nothing.
  if (clean(body.company)) {
    return NextResponse.json({ ok: true });
  }

  const name = clean(body.name, 80);
  const phone = clean(body.phone, 32);
  const wasteType = clean(body.wasteType, 60);
  const digits = phone.replace(/\D/g, "");

  if (name.length < 2) {
    return NextResponse.json({ error: "Укажите имя." }, { status: 400 });
  }
  if (digits.length < 11) {
    return NextResponse.json(
      { error: "Укажите корректный телефон." },
      { status: 400 },
    );
  }

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) {
    console.error("[contact] TELEGRAM_BOT_TOKEN / TELEGRAM_CHAT_ID not set");
    return NextResponse.json(
      { error: "Сервис временно недоступен. Позвоните нам." },
      { status: 503 },
    );
  }

  const text =
    `🗑 Новая заявка — СПЕКТР\n\n` +
    `👤 Имя: ${name}\n` +
    `📞 Телефон: ${phone}\n` +
    `♻️ Тип отходов: ${wasteType || "не указан"}`;

  try {
    const tg = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        disable_web_page_preview: true,
      }),
    });
    if (!tg.ok) {
      console.error("[contact] Telegram error", await tg.text());
      return NextResponse.json(
        { error: "Не удалось отправить заявку. Позвоните нам." },
        { status: 502 },
      );
    }
  } catch (err) {
    console.error("[contact] fetch failed", err);
    return NextResponse.json(
      { error: "Не удалось отправить заявку. Позвоните нам." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
