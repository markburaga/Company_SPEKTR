"use client";

import { useEffect, useState } from "react";
import { Phone } from "lucide-react";
import { site } from "@/lib/site";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled
          ? "border-b border-white/10 bg-ink/80 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <a
          href="#top"
          className="text-lg font-black tracking-tight text-white"
          aria-label={`${site.name} — на главную`}
        >
          {site.name}
          <span className="text-accent">.</span>
        </a>

        <a
          href={`tel:${site.phoneTel}`}
          className="flex items-center gap-2 rounded-full px-2 py-2 text-sm font-bold text-white/90 transition-colors hover:text-accent"
        >
          <Phone className="size-4 text-accent" strokeWidth={2.5} />
          <span>{site.phone}</span>
        </a>
      </div>
    </header>
  );
}
