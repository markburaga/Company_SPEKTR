/**
 * Base path for the deployment (empty in local dev / at a domain root,
 * "/Company_SPEKTR" on GitHub Pages). Next prefixes its own assets
 * automatically, but raw `public/` paths in `src`/`href` strings do not get
 * the prefix — use `asset()` for those (e.g. the hero video & poster).
 */
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function asset(path: string): string {
  return `${BASE_PATH}${path.startsWith("/") ? "" : "/"}${path}`;
}
