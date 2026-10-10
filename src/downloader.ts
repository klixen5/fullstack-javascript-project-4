import axios from 'axios';

function downloadImage(url: string): Promise<Buffer> {
  const response = axios.get<Buffer>(url, {
    responseType: 'arraybuffer',
    headers: {
      Accept: 'image/jpeg, image/png',
    }
  });

  return response
    .then((axiosResponse) => axiosResponse.data);
}

function downloadHtml(url: string): Promise<string> {
  const response = axios
    .get<string>(url, {
      responseType: 'text',
      headers: {
        Accept: 'text/html'
      }
    });

  return response
    .then((axiosResponse) => axiosResponse.data);
}

export  {
  downloadHtml,
  downloadImage
};