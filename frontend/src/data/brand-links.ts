// Official websites of the brands. Clicking a brand opens its original site in a new tab.
const links: Record<string, string> = {
  ferrari: "https://www.ferrari.com",
  lamborghini: "https://www.lamborghini.com",
  porsche: "https://www.porsche.com",
  mclaren: "https://cars.mclaren.com",
  "mercedes-benz": "https://www.mercedes-benz.com",
  "rolls-royce": "https://www.rolls-roycemotorcars.com",
  koenigsegg: "https://www.koenigsegg.com",
  bugatti: "https://www.bugatti.com",
  "aston-martin": "https://www.astonmartin.com",
  ford: "https://www.ford.com",
  chevrolet: "https://www.chevrolet.com",
};
// Falls back to the internal brand page if a brand has no official link yet.
export const brandUrl = (slug: string) => links[slug] ?? `/brands/${slug}`;
