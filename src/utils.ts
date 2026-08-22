export const getFileNameFromUrl = (url: string): string => {
  const path = new URL(url)
  const pathname = path.pathname === '/' ? '' : path.pathname
  return (path.hostname + pathname).replace(/[^a-zA-Z0-9]/g, '-') + '.html'
}