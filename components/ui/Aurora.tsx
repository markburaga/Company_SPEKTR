"use client";

/**
 * Aurora — a very subtle, slow-drifting field of green/forest light that sits
 * over the hero photo (opacity 0.15) for atmospheric depth without hiding it.
 */
export default function Aurora({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 overflow-hidden mix-blend-screen ${className}`}
      style={{ opacity: 0.2 }}
    >
      <div
        className="aurora-layer absolute -inset-1/3 blur-3xl"
        style={{
          backgroundImage:
            "radial-gradient(38% 38% at 28% 32%, #4ade80 0%, transparent 60%)," +
            "radial-gradient(44% 44% at 72% 64%, #1a4a2e 0%, transparent 62%)," +
            "radial-gradient(32% 32% at 62% 18%, #22c55e 0%, transparent 60%)",
        }}
      />
    </div>
  );
}
