function downloadImage(url: string): Promise<Buffer> {
  const response = fetch(url, {
    headers: {
      'Accept': 'image/png, image/jpeg',
    }
  });

  return response
    .then(response => response.arrayBuffer())
    .then(buffers => Buffer.from(buffers));
}

function downloadHtml(url: string): Promise<string> {
  const response = fetch(url, {
    headers: {
      'Accept': 'text/html'
    }
  });

  return response
    .then(response => response.text())
}

export  {
  downloadHtml,
  downloadImage
};