/**
 * Central site configuration — single source of truth for contact details,
 * reused across header, hero, CTA bar, contact section and metadata.
 */
export const site = {
  name: "СПЕКТР",
  city: "Сочи",
  region: "Краснодарский край",
  description: "Вывоз мусора в Сочи — контейнеры от 8 до 36 м³, выезд 24/7.",
  url: "https://spektr-sochi.ru",

  // Display + tel: variants of the phone
  phone: "+7 (862) 555-00-00",
  phoneTel: "+78625550000",

  email: "info@spektr-sochi.ru",

  // Messenger deep links
  whatsapp: "https://wa.me/78625550000",
  telegram: "https://t.me/spektr_sochi",

  eyebrow: "СОЧИ · КРАСНОДАРСКИЙ КРАЙ",
} as const;
