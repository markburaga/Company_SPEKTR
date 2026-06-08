"use client";

import Image from "next/image";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { Phone, Star } from "lucide-react";
import { site } from "@/lib/site";
import { images } from "@/lib/images";
import Aurora from "@/components/ui/Aurora";
import ScrambleText from "@/components/ui/ScrambleText";
import ShimmerButton from "@/components/ui/ShimmerButton";
import ScrollIndicator from "@/components/ui/ScrollIndicator";

const bottomStats = [
  { value: "0 ₽", label: "выезд оценщика" },
  { value: "100+", label: "единиц техники" },
  { value: "15 лет", label: "на рынке" },
];

export default function Hero() {
  const reduce = useReducedMotion();

  // Floating cards fade + gentle rise, after the headline
  const card: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : 16 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, delay: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section
      id="top"
      className="relative min-h-dvh w-full overflow-hidden bg-ink"
    >
      {/* Background photo */}
      <Image
        src={images.hero}
        alt="Контейнеры для вывоза мусора — СПЕКТР, Сочи"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />

      {/* Subtle aurora over the photo (under the dark wash) */}
      <Aurora />

      {/* Cinematic overlays: horizontal dark-green wash + bottom fade + green glow */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(90deg, rgba(10,26,15,0.88) 0%, rgba(10,26,15,0.6) 45%, rgba(10,26,15,0.4) 100%)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(180deg, rgba(10,26,15,0.55) 0%, rgba(10,26,15,0) 28%, rgba(10,26,15,0.85) 88%, rgba(10,26,15,1) 100%)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 mix-blend-screen"
        style={{
          backgroundImage:
            "radial-gradient(60% 50% at 72% 42%, rgba(74,222,128,0.28) 0%, rgba(74,222,128,0) 70%)",
        }}
      />

      {/* ---- Floating glass stat cards ---- */}
      <motion.div
        variants={card}
        initial="hidden"
        animate="show"
        className="absolute left-5 top-24 z-20"
      >
        <div className="glass animate-float rounded-2xl px-4 py-3">
          <div className="flex items-center gap-1.5">
            <Star className="size-4 fill-accent text-accent" />
            <span className="text-xl font-extrabold text-white">4.9</span>
          </div>
          <p className="mt-0.5 text-[11px] text-white/60">рейтинг клиентов</p>
        </div>
      </motion.div>

      <motion.div
        variants={card}
        initial="hidden"
        animate="show"
        className="absolute right-5 top-24 z-20"
      >
        <div
          className="glass rounded-2xl px-4 py-3"
          style={{ animationDelay: "1.5s", background: "rgba(0,0,0,0.8)" }}
        >
          <span className="text-xl font-extrabold text-accent">24/7</span>
          <p className="mt-0.5 text-[11px] text-white/60">приём заявок</p>
        </div>
      </motion.div>

      {/* ---- Main content (bottom-left, editorial) ---- */}
      <div className="relative z-10 mx-auto flex min-h-dvh max-w-6xl flex-col justify-end px-5 pb-10 pt-24">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="mb-4 text-[11px] font-bold uppercase tracking-[0.22em] text-accent/80"
        >
          {site.eyebrow}
        </motion.p>

        <h1 className="text-[72px] font-black leading-[0.9] tracking-tight text-white">
          <ScrambleText text={site.name} duration={1200} />
          {/* dot fades in separately, 0.3s after the letters finish locking */}
          <motion.span
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="inline-block text-accent"
          >
            .
          </motion.span>
        </h1>

        <motion.div
          initial={{ opacity: 0, y: reduce ? 0 : 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55 }}
        >
          <p className="mt-3 text-[28px] font-bold leading-tight text-white">
            Вывоз мусора
          </p>
          <p className="mt-2 max-w-md text-sm text-white/65">
            Контейнеры от 8 до 36 м³. Чисто, по договору, без скрытых доплат.
          </p>
        </motion.div>

        {/* CTA row */}
        <motion.div
          initial={{ opacity: 0, y: reduce ? 0 : 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.75 }}
          className="mt-6 flex flex-col gap-3"
        >
          <ShimmerButton href="#contact">Оставить заявку</ShimmerButton>
          <a
            href={`tel:${site.phoneTel}`}
            className="pulse-border flex h-14 w-full items-center justify-center gap-2 rounded-full border-2 bg-white/5 text-base font-bold text-white backdrop-blur-sm transition-colors hover:bg-white/10"
          >
            <Phone className="size-4 text-accent" strokeWidth={2.5} />
            {site.phone}
          </a>
        </motion.div>

        {/* Bottom stats bar */}
        <motion.div
          initial={{ opacity: 0, y: reduce ? 0 : 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.95 }}
          className="glass mt-6 grid grid-cols-3 divide-x divide-white/10 rounded-2xl py-3"
        >
          {bottomStats.map((s) => (
            <div key={s.label} className="px-2 text-center">
              <div className="text-lg font-extrabold text-accent">{s.value}</div>
              <div className="mt-0.5 text-[10px] leading-tight text-white/55">
                {s.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      <ScrollIndicator />
    </section>
  );
}
