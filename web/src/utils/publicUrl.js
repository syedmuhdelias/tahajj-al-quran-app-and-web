/** Resolves paths under Vite `public/` with correct base (e.g. GitHub Pages subpath). */
export function publicUrl(path) {
  const clean = path.startsWith('/') ? path.slice(1) : path;
  const base = import.meta.env.BASE_URL || '/';
  const normalizedBase = base.endsWith('/') ? base : `${base}/`;
  return `${normalizedBase}${clean}`;
}
