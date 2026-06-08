"use client";

import { useEffect, useRef } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";

type Stat = {
  /** Numeric target for count-up, or null for static text like "24/7". */
  value: number | null;
  display?: string;
  suffix?: string;
  label: string;
  desc: string;
};

const stats: Stat[] = [
  {
    value: 100,
    suffix: "+",
    label: "единиц техники",
    desc: "Собственный автопарк — выезжаем без задержек",
  },
  {
    value: 15,
    label: "лет на рынке",
    desc: "Работаем в Сочи и крае с 2011 года",
  },
  {
    value: null,
    display: "24/7",
    label: "приём заявок",
    desc: "Принимаем обращения круглосуточно, без выходных",
  },
  {
    value: 5000,
    suffix: "+",
    label: "довольных клиентов",
    desc: "Частные лица, ТСЖ, бизнес и строительные площадки",
  },
];

function Counter({
  to,
  suffix = "",
  active,
}: {
  to: number;
  suffix?: string;
  active: boolean;
}) {
  const reduce = useReducedMotion();
  const count = useMotionValue(reduce ? to : 0);
  // Spring gives an organic ease-out deceleration (Number Ticker style).
  const spring = useSpring(count, { damping: 40, stiffness: 90, mass: 1 });
  const value = reduce ? count : spring;
  const text = useTransform(value, (v) =>
    Math.round(v).toLocaleString("ru-RU"),
  );

  useEffect(() => {
    if (reduce) return;
    if (active) count.set(to);
  }, [active, to, reduce, count]);

  return (
    <span className="tabular-nums">
      <motion.span>{text}</motion.span>
      {suffix}
    </span>
  );
}

function StatRow({ stat }: { stat: Stat }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -20% 0px" });
  const ease = [0.16, 1, 0.3, 1] as const;

  return (
    <div ref={ref} className="flex items-center justify-between gap-4 py-8 pr-4">
      {/* Huge number — slides in from the left */}
      <motion.div
        initial={{ opacity: 0, x: -36 }}
        animate={inView ? { opacity: 1, x: 0 } : undefined}
        transition={{ duration: 0.6, ease }}
        className="shrink-0 text-[52px] font-black leading-[0.85] tracking-tighter text-accent tabular-nums sm:text-[80px]"
      >
        {stat.value === null ? (
          stat.display
        ) : (
          <Counter to={stat.value} suffix={stat.suffix} active={inView} />
        )}
      </motion.div>

      {/* Label + description — slides in from the right, wraps within its column */}
      <motion.div
        initial={{ opacity: 0, x: 36 }}
        animate={inView ? { opacity: 1, x: 0 } : undefined}
        transition={{ duration: 0.6, delay: 0.12, ease }}
        className="min-w-0 flex-1 text-right"
      >
        <div className="text-base font-bold leading-tight text-white">
          {stat.label}
        </div>
        <div className="mt-1.5 text-xs leading-snug text-balance text-white/45">
          {stat.desc}
        </div>
      </motion.div>
    </div>
  );
}

export default function WhyUs() {
  return (
    <section className="bg-near-black py-20 text-white">
      <div className="mx-auto max-w-6xl px-6">
        <p className="text-xs font-bold uppercase tracking-[0.28em] text-accent">
          04 / Почему мы
        </p>
        <h2 className="mt-3 text-[32px] font-black leading-tight tracking-tight">
          Цифры говорят сами
        </h2>

        <div className="mt-10 divide-y divide-white/[0.08] border-y border-white/[0.08]">
          {stats.map((s) => (
            <StatRow key={s.label} stat={s} />
          ))}
        </div>
      </div>
    </section>
  );
}
