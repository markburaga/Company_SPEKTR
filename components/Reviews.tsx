"use client";

import { motion } from "framer-motion";
import { BadgeCheck, Star } from "lucide-react";

const reviews = [
  {
    text: "Заказывали вывоз строймусора после ремонта квартиры. Приехали в тот же день, работали быстро и аккуратно, вынесли всё до последнего мешка. Цена не изменилась ни на рубль.",
    name: "Андрей М.",
    city: "Сочи",
  },
  {
    text: "Нужно было срочно вывезти старую мебель и хлам с дачи. Менеджер перезвонил через пару минут, бункер привезли на следующее утро. Очень довольны, рекомендую.",
    name: "Елена К.",
    city: "Краснодар",
  },
  {
    text: "Сотрудничаем как ТСЖ уже второй год. Всегда вовремя, документы в полном порядке, водители вежливые. Наконец-то нашли подрядчика, на которого можно положиться.",
    name: "Дмитрий В.",
    city: "Сочи",
  },
];

export default function Reviews() {
  return (
    <section className="bg-[#111111] py-20 text-white">
      <div className="mx-auto max-w-xl px-6">
        <p className="text-xs font-bold uppercase tracking-[0.28em] text-accent">
          Отзывы
        </p>
        <h2 className="mt-3 text-[32px] font-black leading-tight tracking-tight">
          Нам доверяют
        </h2>

        <div className="mt-10 flex flex-col gap-4">
          {reviews.map((r, i) => (
            <motion.article
              key={r.name}
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "0px 0px -12% 0px" }}
              transition={{ duration: 0.5, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-6"
            >
              {/* subtle white border beam */}
              <span
                aria-hidden
                className="border-beam beam-always absolute inset-0 rounded-2xl"
                style={{ ["--beam-color" as string]: "rgba(255,255,255,0.85)" }}
              />

              <div className="relative">
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <Star
                      key={s}
                      className="size-4 fill-[#facc15] text-[#facc15]"
                    />
                  ))}
                </div>

                <p className="mt-4 text-[15px] leading-relaxed text-white/80">
                  {r.text}
                </p>

                <div className="mt-5 flex items-center justify-between">
                  <div>
                    <div className="font-bold text-white">{r.name}</div>
                    <div className="text-xs text-white/45">{r.city}</div>
                  </div>
                  <span className="flex items-center gap-1.5 text-xs font-semibold text-accent">
                    <BadgeCheck className="size-4" strokeWidth={2.4} />
                    Проверенный отзыв
                  </span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
