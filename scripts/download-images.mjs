// Скачивает фото карточек контейнеров в public/images/, чтобы сайт не зависел
// от Unsplash CDN на мобильных сетях (РФ/LTE), где он бывает заблокирован или
// очень медленный. Картинки коммитятся в репозиторий и отдаются статикой —
// во время сборки/рантайма обращений к Unsplash больше нет.
//
// Запуск (повторная генерация при смене фото): npm run download-images
//
// Требуется Node 18+ (глобальный fetch). Файл ESM (.mjs).

import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_DIR = join(__dirname, "..", "public", "images");

// Проверенные вручную фото без иностранного текста (кроме мягкого «LIBERTY» на 20).
const images = [
  { id: "1711618732376-416cf6af54f6", name: "container-8.jpg" }, // экскаватор + контейнер со строймусором
  { id: "1697993131332-dea7c4771d4a", name: "container-20.jpg" }, // скип-контейнер с мусором
  { id: "1722695694560-f452b0919d3a", name: "container-27.jpg" }, // грейфер на промышленном ломе
  { id: "1635691315495-ff39debe5764", name: "container-36.jpg" }, // мусоровоз заднего загруза
];

const buildUrl = (id) =>
  `https://images.unsplash.com/photo-${id}?w=1200&q=80&auto=format&fit=crop`;

await mkdir(OUT_DIR, { recursive: true });

for (const img of images) {
  const res = await fetch(buildUrl(img.id));
  if (!res.ok) throw new Error(`${img.name}: HTTP ${res.status}`);

  const buf = Buffer.from(await res.arrayBuffer());
  // Защита от «битых» ответов (404 у Unsplash возвращает крошечное тело).
  if (buf.byteLength < 10_000) {
    throw new Error(`${img.name}: подозрительно малый файл (${buf.byteLength} б)`);
  }

  await writeFile(join(OUT_DIR, img.name), buf);
  console.log(`✓ ${img.name} — ${(buf.byteLength / 1024).toFixed(0)} КБ`);
}

console.log(`Готово: ${images.length} файлов в public/images/`);
