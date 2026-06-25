export const apiBase = "/api";

export async function getJSON(path, opts) {
  const res = await fetch(`${apiBase}${path}`, opts);
  return res.json();
}
