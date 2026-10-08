export function createName(url: string, extname: string): string {
  const urlObject = new URL(url);
  const basis = urlObject.hostname + urlObject.pathname + urlObject.search;
  return basis.replace(/[^a-zA-Z0-9]/g, '-') + '.' + extname;
}