import axios from 'axios'

const BASE_URL = process.env.REMOTEOK_BASE_URL

/**
 * Fetches a list of job objects from Remoteok.
 * @author Joel Salo (js225fg)
 * @returns {Object[]} - Remoteok jobs.
 */
export const getJobListings = async () => {
  return axios.get(`${BASE_URL}`).then(res => res.data.slice(1))
}
