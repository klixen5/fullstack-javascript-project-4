import axios from 'axios'

const fetcher = (url: string): Promise<string> => {
  return axios
    .get<string>(url)
    .then(response => response.data)
}

export default fetcher