"use client";

/**
 * Shimmer Button (Magic UI / 21st.dev style) — a solid accent pill with a
 * conic-gradient spark travelling around the border + a left-to-right shine.
 */
export default function ShimmerButton({
  href,
  children,
  className = "",
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <a
      href={href}
      onClick={onClick}
      className={`group relative inline-flex w-full items-center justify-center overflow-hidden rounded-full p-[1.5px] shadow-[0_10px_40px_-10px_rgba(74,222,128,0.55)] ${className}`}
    >
      {/* travelling spark (border) */}
      <span aria-hidden className="shimmer-spark" />
      {/* solid button face with shine sweep */}
      <span className="shimmer-sweep relative z-10 flex h-14 w-full items-center justify-center gap-2 rounded-full bg-accent text-base font-extrabold text-ink transition-transform active:scale-[0.98]">
        {children}
      </span>
    </a>
  );
}
