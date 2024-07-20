const BASE_URL = 'https://movies-api.nomadcoders.workers.dev';

export const getPopular = async () => {
  const r = await fetch(`${BASE_URL}/popular`);
  const json = await r.json();
  return json;
};

export async function getNowPlaying() {
  const r = await fetch(`${BASE_URL}/now-playing`);
  const json = await r.json();
  return json;
}

export async function getComingSoon() {
  const r = await fetch(`${BASE_URL}/coming-soon`);
  const json = await r.json();
  return json;
}

export const getMovie = async (id) => {
  const r = await fetch(`${BASE_URL}/movie?id=${id}`);
  const json = await r.json();
  return json;
};

export function makeImagePath(image) {
  return `https://image.tmdb.org/t/p/w500${image}`;
}

export function makeBgPath(image) {
  return `https://image.tmdb.org/t/p/original${image}`;
}
