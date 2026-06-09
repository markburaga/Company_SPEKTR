import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    // Все фото теперь локальные (public/images/). unoptimized обязателен для
    // статического экспорта (output: export) на GitHub Pages — иначе next/image
    // требует сервер оптимизации. Это же значение проставляет и configure-pages
    // в CI; задаём явно, чтобы поведение совпадало локально.
    unoptimized: true,
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
