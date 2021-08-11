import { getJobListings, getCategories } from './remotiveApi.js'

/**
 * Encapsulates a class for making API requests to Remotive
 * @author Joel Salo (js225fg)
 */
export default class Remotive {
  /**
   * Get ads with the specified search criteria.
   *
   * @param {Number} offset - Integer representing the offset to return
   * @param {Number} limit - Integer representing the maximum number of JobItems to return
   * @returns {JobItem[]} - The job items from Remotive API
   */
  async getAds (query, offset, limit) {
    // const category = query.category >> hardcoded atm
    offset = parseInt(offset)
    limit = parseInt(limit)

    const start = limit * offset
    const end = start + limit

    try {
      const search = await getJobListings() // fixed to search for software dev jobs in europe

      if (search.jobs.length > 0) {
        const jobs = _buildJobItems(search.jobs)

        let filteredJobs = _matchLocation(jobs)

        if (query) {
          filteredJobs = _matchQuery(query, filteredJobs)
        }
        // max number of pages that can be populated with JobItems
        const maxPage = filteredJobs.length / limit
        const maxStartIndex = Math.floor(maxPage) * limit - 1

        if (filteredJobs.length >= end) {
          return filteredJobs.slice(start, end)
        } else if (maxPage - offset > 0 && maxPage - offset < 1) {
          // if there are JobItems to fetch but not enough to populate a full page (ex. if maxPage === 1.5)
          return filteredJobs.slice(maxStartIndex, filteredJobs.length)
        } else if (filteredJobs.length <= limit && offset === 0) {
          // if there are any JobItems at all and the offset is set to 0
          return filteredJobs
        } else {
          return []
        }
      }

      return []
    } catch (error) {
      console.log(error)
    }
  }

  /**
   * Get all available categories.
   *
   * @returns {object[]} - All categories from Remotive
   */
  async getCategories () {
    try {
      const categories = await getCategories()

      return categories.jobs
    } catch (error) {
      console.log(error)
    }
  }
}

/**
 * Re-shapes a list of job ads to conform to Softworks specification.
 * @param {Object[]} items - The array of job ads to build according to the specified criteria in regards to the API
 * @returns
 */
const _buildJobItems = (items) => {
  const jobs = items.map((item) => ({
    title: item.title,
    description: item.description.replace(/(\r\n|\n|\r|\<.*?\>)/gm, ' ').trim(),
    company: item.company_name,
    publishedDate: item.publication_date,
    url: item.url,
    remote: 'true',
    location: {
      municipality: 'remote',
      region: 'remote',
      country: item.candidate_required_location
    },
    source: 'Remotive'
  }))

  return jobs
}

/**
 * Filters an array based on locations specified.
 * @param {Object[]} items - The array of job ads to filter based on location
 * @returns
 */
const _matchLocation = (items) => {
  const LOCATIONS = [
    'anywhere',
    'global',
    'worldwide',
    'multiple',
    'europe',
    'european',
    'eu',
    'gmt+2',
    'cet',
    'utc+2'
  ]

  const found = []

  for (const item of items) {
    if (
      LOCATIONS.some((str) => item.location.country.toLowerCase().includes(str))
    ) {
      found.push(item)
    }
  }

  return found
}

/**
 * Filters an array based on a specified query.
 * @param {Object[]} items - The array of job ads to filter based on query
 * @returns
 */
 const _matchQuery = (query, items) => {
  const found = []

  for (const item of items) {
    if (item.title.toLowerCase().includes(query.toLowerCase())) {
      found.push(item)
    } else if (item.description.toLowerCase().includes(query.toLowerCase())) {
      found.push(item)
    }
  }

  return found
}
