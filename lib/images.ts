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
  containerSmall: unsplash("1770390706248-5669d9c242d4", 1000), // construction skip bin
  containerMedium: unsplash("1697993131332-dea7c4771d4a", 1000), // roll-off w/ debris
  containerLarge: unsplash("1717667745830-de42bb75a4fa", 1000), // industrial loader
  containerMax: unsplash("1648848568410-829a327c7b1e", 1000), // clean fleet truck
} as const;
