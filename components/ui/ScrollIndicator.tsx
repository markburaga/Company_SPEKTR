"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

/** Bouncing scroll cue at the foot of the hero; fades out after the first scroll. */
export default function ScrollIndicator() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY < 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, y: 6 }}
          transition={{ duration: 0.4 }}
          className="pointer-events-none absolute bottom-1.5 left-1/2 z-20 -translate-x-1/2"
        >
          <ChevronDown className="scroll-bounce size-6 text-white/60" strokeWidth={2.5} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
