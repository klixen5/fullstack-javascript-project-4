import axios from 'axios'

export default (url: string): Promise<string> => {
  return axios.get<string>(url).then(response => response.data).catch(error => 'error')
}