import axios from 'axios'
import querystring from 'querystring'

/**
 * Wrapper class for making API calls to Platsbanken.
 * @author Jon Cavallie Mester
 */
export default class Platsbanken {
  /**
   * Constructor
   * @param {string} apiKey
   */
  constructor (apiKey) {
    if (apiKey === null || apiKey === undefined) {
      throw new Error('An API key for Platsbanken is required.')
    }
    if (apiKey.length !== 67) {
      throw new Error('Invalid length of API key. Please check your input.')
    }
    this.apiKey = apiKey
  }

  /**
   * A method which takes an object of search criterion
   * and returns it in a string format to be used in
   * the API request.
   * @param {object} query
   */
  _getQueryString (query) {
    const queries = []
    Object.entries(query).forEach(([key, value]) => {
      if (value === null || value === undefined) return
      queries.push(`${key}=${value}`)
    })

    const hardFilters = ['occupation-name=rQds_YGd_quU'] //Mjukvaruutvecklare
    return [...queries, ...hardFilters].join('&')
  }

  /**
   * 
   * @param {*} criterion 
   * @param {*} offset 
   * @param {*} limit 
   * @returns {JobItem[]}
   */
  async getAds (criterion, offset, limit) {
    // Verify search criteria, set default values if needed?

    // Construct URL to use in request
    // OLD: const queryString = this._getQueryString({ ...criterion, offset, limit })
    const queryParams = {}
    if(criterion.municipality !== undefined) queryParams.municipality = criterion.municipality
    if(criterion.region !== undefined) queryParams.region = criterion.region
    if(criterion.country !== undefined) queryParams.country = criterion.country
    queryParams.q = criterion.q

    const queryString = querystring.stringify({
      ...queryParams, offset, limit, 'occupation-name': 'rQds_YGd_quU'
    })

    const requestURL = `${process.env.PLATSBANKEN_BASE_URL}/search?${queryString}`
    const response = await axios.get(requestURL, {
      headers: {
        'api-key': process.env.PLATSBANKEN_KEY
      }
    })

    // Return job ads according to JobItem interface
    return response.data.hits.map(item => {
      return {
        title: item.headline,
        description: item.description.text.replace(/(\r\n|\n|\r)/gm, ' '),
        company: item.employer.name,
        publishedDate: item.last_publication_date,
        logoURL: item.logo_url,
        url: item.webpage_url,
        location: {
          municipality: item.workplace_address.municipality,
          region: item.workplace_address.region,
          country: item.workplace_address.country
        }
      }
    })
  }
}
