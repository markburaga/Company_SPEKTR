"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Phone } from "lucide-react";
import { site } from "@/lib/site";

export default function StickyCallBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.9);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ type: "spring", stiffness: 380, damping: 34 }}
          className="pb-safe fixed inset-x-0 bottom-0 z-50 border-t border-white/10 bg-ink/85 px-4 pt-3 backdrop-blur-md"
        >
          <a
            href={`tel:${site.phoneTel}`}
            className="shimmer-sweep flex w-full items-center justify-center gap-2 rounded-full bg-accent py-4 text-base font-extrabold text-ink"
          >
            <Phone className="size-5" strokeWidth={2.75} />
            Позвонить
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
