import axios from 'axios'

const BASE_URL = process.env.REMOTIVE_BASE_URL
const CATEGORY_URL = process.env.REMOTIVE_CATEGORY_URL

/**
 * Fetches a list of job objects matching the category and search criteria.
 * @author Joel Salo (js225fg)
 * @param {*} category - The chosen category, "software-dev" by default
 * @param {*} search - Search term, "europe" by default
 * @returns {Object[]} - Remotive jobs.
 */
export const getJobListings = async (
  category = 'software-dev',
  search = 'europe'
) => {
  const response = await axios.get(
    `${BASE_URL}?category=${category}&search=${search}`
  )

  return response.data
}

/**
 * Gets all available categories.
 *
 * @returns {Object[]} - Remotive job categories.
 */
export const getCategories = async () => {
  const response = await axios.get(`${CATEGORY_URL}`)

  return response.data
}
