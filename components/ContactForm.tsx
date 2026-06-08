"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Check, Loader2, Send } from "lucide-react";
import { site } from "@/lib/site";

const WASTE_TYPES = [
  "Бытовой мусор",
  "Строительный мусор",
  "Крупногабаритный",
  "Промышленные отходы",
  "Другое",
];

/** Format raw input into +7 (XXX) XXX-XX-XX as the user types. */
function formatPhone(input: string): string {
  let d = input.replace(/\D/g, "");
  if (d.startsWith("8")) d = "7" + d.slice(1);
  if (!d.startsWith("7")) d = "7" + d;
  d = d.slice(0, 11);
  const r = d.slice(1); // up to 10 digits after the country code
  let out = "+7";
  if (r.length > 0) out += " (" + r.slice(0, 3);
  if (r.length >= 3) out += ") " + r.slice(3, 6);
  if (r.length >= 6) out += "-" + r.slice(6, 8);
  if (r.length >= 8) out += "-" + r.slice(8, 10);
  return out;
}

type Status = "idle" | "sending" | "success" | "error";

export default function ContactForm() {
  const reduce = useReducedMotion();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [wasteType, setWasteType] = useState(WASTE_TYPES[0]);
  const [company, setCompany] = useState(""); // honeypot
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  const phoneDigits = phone.replace(/\D/g, "");
  const valid = name.trim().length >= 2 && phoneDigits.length >= 11;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!valid || status === "sending") return;
    setStatus("sending");
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, wasteType, company }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Не удалось отправить заявку.");
      }
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Ошибка отправки.");
    }
  }

  const fieldClass =
    "w-full rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4 text-base text-white placeholder-white/35 outline-none transition-colors focus:border-accent/60 focus:bg-white/[0.06]";

  return (
    <section id="contact" className="bg-near-black py-20 text-white">
      <div className="mx-auto max-w-xl px-6">
        <p className="text-xs font-bold uppercase tracking-[0.28em] text-accent">
          05 / Заявка
        </p>
        <h2 className="mt-3 text-[34px] font-black leading-tight tracking-tight">
          Оставить заявку
        </h2>
        <p className="mt-2 text-white/55">Перезвоним за 5 минут.</p>

        <div className="relative mt-10 min-h-[420px]">
          {status === "success" ? (
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center justify-center rounded-3xl border border-accent/30 bg-accent/5 px-6 py-16 text-center"
            >
              <motion.div
                initial={reduce ? false : { scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 16 }}
                className="flex size-20 items-center justify-center rounded-full bg-accent text-ink"
              >
                <motion.span
                  initial={reduce ? false : { pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                >
                  <Check className="size-10" strokeWidth={3} />
                </motion.span>
              </motion.div>
              <h3 className="mt-6 text-2xl font-extrabold">Заявка отправлена!</h3>
              <p className="mt-2 max-w-xs text-white/55">
                Мы свяжемся с вами в течение 5 минут.
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="space-y-3">
              {/* Honeypot — hidden from real users */}
              <div aria-hidden className="absolute left-[-9999px] opacity-0">
                <label>
                  Компания
                  <input
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                  />
                </label>
              </div>

              <div>
                <label htmlFor="name" className="sr-only">
                  Имя
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  placeholder="Ваше имя"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={fieldClass}
                />
              </div>

              <div>
                <label htmlFor="phone" className="sr-only">
                  Телефон
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  placeholder="+7 (___) ___-__-__"
                  value={phone}
                  onChange={(e) => setPhone(formatPhone(e.target.value))}
                  className={fieldClass}
                />
              </div>

              <div>
                <label htmlFor="wasteType" className="sr-only">
                  Тип отходов
                </label>
                <select
                  id="wasteType"
                  name="wasteType"
                  value={wasteType}
                  onChange={(e) => setWasteType(e.target.value)}
                  className={`${fieldClass} appearance-none bg-[length:0] cursor-pointer`}
                >
                  {WASTE_TYPES.map((t) => (
                    <option key={t} value={t} className="bg-near-black">
                      {t}
                    </option>
                  ))}
                </select>
              </div>

              {status === "error" && (
                <p className="text-sm text-red-400">{error}</p>
              )}

              <button
                type="submit"
                disabled={!valid || status === "sending"}
                className="shimmer-sweep flex h-14 w-full items-center justify-center gap-2 rounded-full bg-accent text-base font-extrabold text-ink transition-opacity disabled:opacity-40"
              >
                {status === "sending" ? (
                  <>
                    <Loader2 className="size-5 animate-spin" />
                    Отправляем…
                  </>
                ) : (
                  <>
                    <Send className="size-5" strokeWidth={2.5} />
                    Отправить заявку
                  </>
                )}
              </button>

              <p className="pt-1 text-center text-xs text-white/35">
                Нажимая кнопку, вы соглашаетесь на обработку персональных данных.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
