"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { PhoneCall, MapPin, Truck, FileCheck2 } from "lucide-react";

const steps = [
  {
    n: "01",
    title: "Заявка",
    desc: "Отвечаем за 5 минут, фиксируем объём, адрес и удобное время.",
    Icon: PhoneCall,
  },
  {
    n: "02",
    title: "Выезд",
    desc: "Бесплатная оценка объёма работ на месте — без обязательств.",
    Icon: MapPin,
  },
  {
    n: "03",
    title: "Вывоз",
    desc: "Работаем чисто и аккуратно. Фиксированная цена, без доплат.",
    Icon: Truck,
  },
  {
    n: "04",
    title: "Документы",
    desc: "Лицензированный полигон и полный пакет закрывающих документов.",
    Icon: FileCheck2,
  },
];

export default function HowItWorks() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 80%", "end 65%"],
  });
  // The dashed accent line "draws" from top to bottom as the section scrolls.
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section className="relative overflow-hidden bg-cream py-24 text-[#10231a]">
      {/* Oversized editorial watermark */}
      <span
        aria-hidden
        className="pointer-events-none absolute -right-6 top-2 select-none text-[200px] font-black leading-none tracking-tighter text-forest opacity-[0.06]"
      >
        03
      </span>

      <div className="mx-auto max-w-6xl px-6">
        <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#1a4a2e]">
          03 / Как это работает
        </p>
        <h2 className="mt-3 max-w-md text-[40px] font-black leading-[0.98] tracking-tight">
          Четыре шага до&nbsp;чистого объекта
        </h2>

        {/* Timeline */}
        <div ref={ref} className="relative mt-16 pl-3">
          {/* Static dashed track */}
          <div
            aria-hidden
            className="absolute bottom-3 left-3 top-3 w-0 border-l-2 border-dashed border-[#10231a]/15"
          />
          {/* Animated accent line that draws on scroll */}
          <motion.div
            aria-hidden
            style={{ height: reduce ? "100%" : lineHeight }}
            className="absolute left-3 top-3 w-0 border-l-2 border-dashed border-accent"
          />

          <ol>
            {steps.map((s, i) => (
              <motion.li
                key={s.n}
                className="relative pl-12"
                initial={reduce ? false : { opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "0px 0px -18% 0px" }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="relative border-l-2 border-accent/70 py-9 pl-6">
                  {/* Giant decorative number behind the content */}
                  <span
                    aria-hidden
                    className="pointer-events-none absolute -top-3 left-4 select-none text-[80px] font-black leading-none text-[#10231a] opacity-[0.07]"
                  >
                    {s.n}
                  </span>

                  <div className="relative">
                    <div className="flex items-center gap-3">
                      <s.Icon className="size-6 text-[#1a4a2e]" strokeWidth={2} />
                      <h3 className="text-2xl font-black tracking-tight">
                        {s.title}
                      </h3>
                    </div>
                    <p className="mt-3 max-w-sm text-[15px] leading-relaxed text-[#475569]">
                      {s.desc}
                    </p>
                  </div>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
