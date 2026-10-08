import axios from 'axios';

function downLoadHtml(url: string): Promise<string> {
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

export default downLoadHtml;