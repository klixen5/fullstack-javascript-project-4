export function generateFilename(url: string, extname: string): string {
  const urlObject = new URL(url);
  const { hostname, pathname, search } = urlObject;
  const basis = hostname + (pathname === '/' ? '' : pathname) + search;
  return basis.replace(/[^a-zA-Z0-9]/g, '-') + '.' + extname;
}