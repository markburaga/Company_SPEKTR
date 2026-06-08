"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from "framer-motion";
import { ArrowRight } from "lucide-react";
import { images } from "@/lib/images";

type Container = {
  volume: string;
  unit: string;
  name: string;
  desc: string;
  price: string;
  bg: string;
  img: string;
  alt: string;
  badge?: string;
};

const containers: Container[] = [
  {
    volume: "8",
    unit: "м³",
    name: "Газель",
    desc: "Для квартиры, офиса, небольшого ремонта",
    price: "от 2 000 ₽",
    bg: "#0d1f12",
    img: images.containerSmall,
    alt: "Компактный контейнер для бытового мусора",
  },
  {
    volume: "20",
    unit: "м³",
    name: "Среднее КО",
    desc: "Строймусор, крупный ремонт, магазины",
    price: "от 8 000 ₽",
    bg: "#0f2416",
    img: images.containerMedium,
    alt: "Контейнер-ролонит со строительным мусором",
  },
  {
    volume: "27",
    unit: "м³",
    name: "Бункер",
    desc: "Крупные объекты, стройки, предприятия",
    price: "от 12 000 ₽",
    bg: "#132a1a",
    img: images.containerLarge,
    alt: "Промышленный бункер на предприятии",
  },
  {
    volume: "36",
    unit: "м³",
    name: "Мультилифт",
    desc: "Максимальный объём. Промышленные отходы",
    price: "от 18 000 ₽",
    bg: "#163020",
    img: images.containerMax,
    alt: "Мультилифт максимального объёма",
    badge: "МАКС. ОБЪЁМ",
  },
];

/** #rrggbb -> rgba(r,g,b,a) */
function rgba(hex: string, a: number) {
  const n = parseInt(hex.replace("#", ""), 16);
  const r = (n >> 16) & 255;
  const g = (n >> 8) & 255;
  const b = n & 255;
  return `rgba(${r}, ${g}, ${b}, ${a})`;
}

/** Visual contents of a single card — shared by scroll & reduced-motion modes. */
function CardContent({ c }: { c: Container }) {
  return (
    <>
      {/* Photo — the visual hero of the card (~52%), fading into the colour */}
      <div className="relative h-[52%] w-full shrink-0">
        <Image
          src={c.img}
          alt={c.alt}
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.15) 0%, ${rgba(
              c.bg,
              0,
            )} 45%, ${rgba(c.bg, 0.85)} 82%, ${c.bg} 100%)`,
          }}
        />
        {c.badge && (
          <span className="absolute right-4 top-4 z-10 rounded-full bg-accent px-3 py-1.5 text-[11px] font-extrabold uppercase tracking-wide text-ink shadow-lg">
            {c.badge}
          </span>
        )}
      </div>

      {/* Content — bottom ~48%: volume block sits under the photo, the
          price + button row is pinned to the foot via justify-between. */}
      <div
        className="relative flex h-[48%] flex-col justify-between px-6 pb-28 pt-4"
        style={{ backgroundColor: c.bg }}
      >
        {/* subtle green glow at the bottom */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-40"
          style={{
            backgroundImage:
              "radial-gradient(70% 100% at 30% 100%, rgba(74,222,128,0.16) 0%, rgba(74,222,128,0) 70%)",
          }}
        />

        <div className="relative">
          <div className="flex items-end gap-2">
            <span className="text-[120px] font-black leading-[0.78] tracking-tighter text-white">
              {c.volume}
            </span>
            <span className="mb-4 text-[40px] font-extrabold leading-none text-accent">
              {c.unit}
            </span>
          </div>
          <h3 className="mt-3 text-2xl font-extrabold text-white">{c.name}</h3>
          <p className="mt-2 max-w-xs text-sm leading-relaxed text-white/60">
            {c.desc}
          </p>
        </div>

        <div className="relative flex items-center justify-between gap-3">
          <span className="rounded-full border border-accent/40 bg-accent/10 px-4 py-2.5 text-base font-extrabold text-accent">
            {c.price}
          </span>
          <a
            href="#contact"
            className="flex items-center gap-1.5 rounded-full bg-accent px-5 py-3 text-sm font-extrabold text-ink transition-transform active:scale-95"
          >
            Заказать
            <ArrowRight className="size-4" strokeWidth={2.75} />
          </a>
        </div>
      </div>

      {/* Spotlight — follows the pointer / finger across the card */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[6]"
        style={{
          opacity: "var(--spot, 0)" as unknown as number,
          transition: "opacity 0.25s ease",
          background:
            "radial-gradient(220px circle at var(--mx, 50%) var(--my, 50%), rgba(74,222,128,0.18), transparent 70%)",
        }}
      />
    </>
  );
}

/** Pointer/touch spotlight handlers — write position + visibility as CSS vars. */
function onSpotMove(e: React.PointerEvent<HTMLElement>) {
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
  e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  e.currentTarget.style.setProperty("--spot", "1");
}
function onSpotLeave(e: React.PointerEvent<HTMLElement>) {
  e.currentTarget.style.setProperty("--spot", "0");
}

/** A scroll-driven card layer. Rises + scales up to cover the previous card,
 *  then recedes (slides up, scales down, dims) as the next one enters. */
function CardLayer({
  c,
  i,
  progress,
}: {
  c: Container;
  i: number;
  progress: MotionValue<number>;
}) {
  const band = 0.18;
  const isFirst = i === 0;
  const isLast = i === 3;

  // Entrance window (slides up from below + scales up to cover the previous card).
  const enterStart = i * 0.25 - band;
  const enterEnd = i * 0.25;
  // Recede window (covered by the next card — slides up slightly, scales down, dims).
  const recedeStart = (i + 1) * 0.25 - band;
  const recedeEnd = (i + 1) * 0.25;

  // Input stops are kept strictly within [0,1]: the first card only recedes,
  // the last card only enters. (Out-of-range stops crash Framer's WAAPI path.)
  const input = isFirst
    ? [recedeStart, recedeEnd]
    : isLast
      ? [enterStart, enterEnd]
      : [enterStart, enterEnd, recedeStart, recedeEnd];

  const yOut = isFirst
    ? ["0%", "-8%"]
    : isLast
      ? ["100%", "0%"]
      : ["100%", "0%", "0%", "-8%"];

  const scaleOut = isFirst ? [1, 0.92] : isLast ? [0.92, 1] : [0.92, 1, 1, 0.92];
  const opacityOut = isFirst ? [1, 0.5] : isLast ? [1, 1] : [1, 1, 1, 0.5];

  const y = useTransform(progress, input, yOut);
  const scale = useTransform(progress, input, scaleOut);
  const opacity = useTransform(progress, input, opacityOut);

  return (
    <motion.article
      initial={false}
      onPointerMove={onSpotMove}
      onPointerLeave={onSpotLeave}
      style={{ y, scale, opacity, zIndex: i + 1 }}
      className="absolute inset-0 flex h-full w-full flex-col overflow-hidden rounded-t-[28px] shadow-[0_-20px_60px_-15px_rgba(0,0,0,0.6)]"
    >
      <CardContent c={c} />
    </motion.article>
  );
}

/** A single scroll-driven progress dot — smoothly turns green and grows
 *  while its card is the active one. Inputs stay strictly within [0,1]. */
function ProgressDot({
  i,
  progress,
}: {
  i: number;
  progress: MotionValue<number>;
}) {
  // Active band for card i (transition midpoints between the four cards).
  const edges = [0, 0.16, 0.41, 0.66, 1];
  const lo = edges[i];
  const hi = edges[i + 1];
  const eps = 0.03;
  const isFirst = i === 0;
  const isLast = i === edges.length - 2;

  const idle = "rgba(255,255,255,0.3)";
  const live = "rgba(74,222,128,1)";

  // First dot has no fade-in (lo = 0); last has no fade-out (hi = 1).
  const input = isFirst
    ? [lo, hi, hi + eps]
    : isLast
      ? [lo - eps, lo, hi]
      : [lo - eps, lo, hi, hi + eps];

  const colorOut = isFirst
    ? [live, live, idle]
    : isLast
      ? [idle, live, live]
      : [idle, live, live, idle];

  const heightOut = isFirst
    ? ["24px", "24px", "8px"]
    : isLast
      ? ["8px", "24px", "24px"]
      : ["8px", "24px", "24px", "8px"];

  const background = useTransform(progress, input, colorOut);
  const height = useTransform(progress, input, heightOut);

  return (
    <motion.span
      initial={false}
      style={{ background, height }}
      className="block w-2 rounded-full"
      aria-hidden
    />
  );
}

/** Vertical progress dots — the active card's dot turns bright green. */
function ProgressDots({ progress }: { progress: MotionValue<number> }) {
  return (
    <div className="absolute right-4 top-1/2 z-50 flex -translate-y-1/2 flex-col items-center gap-3">
      {containers.map((_, i) => (
        <ProgressDot key={i} i={i} progress={progress} />
      ))}
    </div>
  );
}

export default function ContainersStack() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // Section label — shown once, before the sticky stack begins.
  const intro = (
    <div className="bg-ink px-5 pb-12 pt-20">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent">
        02 / Контейнеры
      </p>
      <h2 className="mt-2 text-[32px] font-black leading-none text-white">
        Выберите объём
      </h2>
    </div>
  );

  // Reduced motion: render a plain, accessible vertical stack of full-height cards.
  if (reduce) {
    return (
      <section id="containers" aria-label="Контейнеры и цены">
        {intro}
        {containers.map((c, i) => (
          <article
            key={i}
            onPointerMove={onSpotMove}
            onPointerLeave={onSpotLeave}
            className="relative flex min-h-dvh w-full flex-col overflow-hidden"
            style={{ backgroundColor: c.bg }}
          >
            <CardContent c={c} />
          </article>
        ))}
      </section>
    );
  }

  return (
    <section id="containers" aria-label="Контейнеры и цены">
      {intro}

      {/* Sticky card stack — 500vh tall, one card revealed per quarter of scroll. */}
      <div ref={ref} className="relative h-[500vh]">
        <div className="sticky top-0 h-dvh w-full overflow-hidden bg-ink">
          {containers.map((c, i) => (
            <CardLayer key={i} c={c} i={i} progress={scrollYProgress} />
          ))}

          {/* Vertical progress dots */}
          <ProgressDots progress={scrollYProgress} />
        </div>
      </div>
    </section>
  );
}
