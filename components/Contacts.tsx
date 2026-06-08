"use client";

import { motion } from "framer-motion";
import { Mail, MessageCircle, Phone, Send } from "lucide-react";
import { site } from "@/lib/site";

const channels = [
  {
    label: "WhatsApp",
    value: "Написать в чат",
    href: site.whatsapp,
    color: "#25D366",
    Icon: MessageCircle,
    external: true,
  },
  {
    label: "Telegram",
    value: "Написать в чат",
    href: site.telegram,
    color: "#0088cc",
    Icon: Send,
    external: true,
  },
  {
    label: "Телефон",
    value: site.phone,
    href: `tel:${site.phoneTel}`,
    color: "#4ade80",
    Icon: Phone,
    external: false,
  },
  {
    label: "Эл. почта",
    value: site.email,
    href: `mailto:${site.email}`,
    color: "#9ca3af",
    Icon: Mail,
    external: false,
  },
];

export default function Contacts() {
  return (
    <section id="contacts" className="bg-ink pt-20 text-white">
      <div className="mx-auto max-w-xl px-6">
        <p className="text-xs font-bold uppercase tracking-[0.28em] text-accent">
          06 / Контакты
        </p>
        <h2 className="mt-3 text-[32px] font-black leading-tight tracking-tight">
          Свяжитесь удобным способом
        </h2>

        <div className="mt-10 grid grid-cols-2 gap-3">
          {channels.map((c, i) => (
            <motion.a
              key={c.label}
              href={c.href}
              target={c.external ? "_blank" : undefined}
              rel={c.external ? "noopener noreferrer" : undefined}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -10% 0px" }}
              transition={{ duration: 0.45, delay: i * 0.06 }}
              className="glass-light group relative flex cursor-pointer flex-col gap-4 overflow-hidden rounded-2xl p-5 transition-colors hover:bg-white/[0.1]"
            >
              {/* Border Beam — coloured light travels the edge on hover/touch */}
              <span
                aria-hidden
                className="border-beam absolute inset-0 rounded-2xl"
                style={{ ["--beam-color" as string]: c.color }}
              />
              <span
                className="relative flex size-12 items-center justify-center rounded-xl"
                style={{ backgroundColor: `${c.color}1f` }}
              >
                <c.Icon className="size-6" style={{ color: c.color }} strokeWidth={2.2} />
              </span>
              <span className="relative">
                <span className="block font-extrabold text-white">{c.label}</span>
                <span className="mt-0.5 block text-xs text-white/55">
                  {c.value}
                </span>
              </span>
            </motion.a>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-16 border-t border-white/10">
        <div className="mx-auto max-w-xl px-6 pb-28 pt-10">
          <div className="text-2xl font-black tracking-tight">
            {site.name}
            <span className="text-accent">.</span>
          </div>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/45">
            Вывоз и утилизация мусора в Сочи и Краснодарском крае. Контейнеры от
            8 до 36 м³, лицензированный полигон, документы для юрлиц.
          </p>

          <dl className="mt-6 space-y-1 text-xs text-white/40">
            <div className="flex gap-2">
              <dt className="text-white/30">ИНН:</dt>
              <dd>2320000000</dd>
            </div>
            <div className="flex gap-2">
              <dt className="text-white/30">Адрес:</dt>
              <dd>354000, г. Сочи, ул. Транспортная, 1</dd>
            </div>
            <div className="flex gap-2">
              <dt className="text-white/30">Режим:</dt>
              <dd>Приём заявок 24/7</dd>
            </div>
          </dl>

          <p className="mt-8 text-xs text-white/30">
            © 2026 {site.name}. Все права защищены.
          </p>
        </div>
      </footer>
    </section>
  );
}
