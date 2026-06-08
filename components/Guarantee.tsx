import { FileText, RotateCcw, ShieldCheck } from "lucide-react";

const items = [
  {
    Icon: ShieldCheck,
    title: "Официальный договор",
    desc: "Фиксируем объём, сроки и цену на бумаге.",
  },
  {
    Icon: FileText,
    title: "Закрывающие документы",
    desc: "Талоны полигона и акты для бухгалтерии.",
  },
  {
    Icon: RotateCcw,
    title: "Возврат, если не приедем",
    desc: "Не вывезли в срок — вернём предоплату.",
  },
];

export default function Guarantee() {
  return (
    <section className="bg-forest py-12 text-white">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-6 sm:grid-cols-3 sm:gap-6">
        {items.map(({ Icon, title, desc }) => (
          <div key={title} className="flex items-start gap-4">
            <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-accent/15">
              <Icon className="size-6 text-accent" strokeWidth={2} />
            </span>
            <div>
              <div className="font-extrabold leading-tight">{title}</div>
              <p className="mt-1 text-sm leading-snug text-white/55">{desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
