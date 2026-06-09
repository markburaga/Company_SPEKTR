/**
 * Локальные фото карточек контейнеров (public/images/).
 * Раньше тянулись с Unsplash CDN, но он блокируется/тормозит на мобильных
 * сетях в РФ — теперь файлы лежат в репозитории (см. scripts/download-images.js).
 *
 * Пути прогоняются через asset(), потому что next/image НЕ добавляет basePath
 * к строковому src сам (см. docs basePath.md) — на GitHub Pages без префикса
 * был бы 404, как было с видео в Hero.
 */
import { asset } from "./basePath";

export const images = {
  // Карточки секции 2, объём от меньшего к большему
  containerSmall: asset("/images/container-8.jpg"), // экскаватор + контейнер со строймусором
  containerMedium: asset("/images/container-20.jpg"), // скип-контейнер с мусором
  containerLarge: asset("/images/container-27.jpg"), // грейфер на промышленном ломе
  containerMax: asset("/images/container-36.jpg"), // мусоровоз заднего загруза
} as const;
