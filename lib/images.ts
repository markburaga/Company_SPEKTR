/**
 * Remote imagery (Unsplash). Hostnames are allow-listed in next.config.ts.
 * Helper builds a sized, auto-formatted URL from a stable photo id.
 */
function unsplash(id: string, w = 1400, q = 70) {
  return `https://images.unsplash.com/photo-${id}?w=${w}&q=${q}&auto=format&fit=crop`;
}

export const images = {
  // Hero — neutral waste containers against a wall (no foreign text)
  hero: unsplash("1532996122724-e3c354a0b15b", 1600, 72),

  // Container showcase cards (section 2), small → large
  containerSmall: unsplash("1711618732376-416cf6af54f6", 1000), // construction debris + roll-off skip
  containerMedium: unsplash("1697993131332-dea7c4771d4a", 1000), // roll-off w/ debris
  containerLarge: unsplash("1717667745830-de42bb75a4fa", 1000), // industrial loader
  containerMax: unsplash("1635691315495-ff39debe5764", 1000), // rear-loading garbage truck (no foreign text)
} as const;
