"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

const POOL = "АБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ#%&*+=><";

/**
 * Scramble / decrypt text effect. On mount each letter cycles through random
 * characters before locking onto the final glyph, staggered left-to-right.
 */
export default function ScrambleText({
  text,
  className = "",
  duration = 1200,
}: {
  text: string;
  className?: string;
  duration?: number;
}) {
  const reduce = useReducedMotion();
  const [out, setOut] = useState<string[]>(() =>
    reduce ? text.split("") : text.split("").map(() => ""),
  );

  useEffect(() => {
    if (reduce) {
      setOut(text.split(""));
      return;
    }
    const chars = text.split("");
    const len = chars.length;
    const start = performance.now();
    // Each letter locks somewhere between 35% and 100% of the duration.
    const lockAt = chars.map((_, i) => duration * (0.35 + (0.55 * i) / len));
    const appearAt = chars.map((_, i) => (duration * 0.25 * i) / len);
    let raf = 0;

    const tick = (now: number) => {
      const t = now - start;
      setOut(
        chars.map((ch, i) => {
          if (ch === " ") return " ";
          if (t >= lockAt[i]) return ch;
          if (t < appearAt[i]) return "";
          return POOL[(Math.random() * POOL.length) | 0];
        }),
      );
      if (t < duration + 60) {
        raf = requestAnimationFrame(tick);
      } else {
        setOut(chars);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [text, duration, reduce]);

  return (
    <span className={className} aria-label={text}>
      {out.map((c, i) => (
        <span key={i} aria-hidden>
          {c === "" ? " " : c}
        </span>
      ))}
    </span>
  );
}
