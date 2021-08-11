import { getJobListings } from './remoteokApi.js'

/**
 * Encapsulates a class for making API requests to Remoteok.
 * @author Joel Salo (js225fg)
 */
export default class Remoteok {
  /**
   *
   * @param {*} query
   * @param {*} offset
   * @param {*} limit
   * @author Jon Cavallie Mester
   */
  async getAdList (query, offset, limit) {
    offset = parseInt(offset)
    limit = parseInt(limit)

    const allJobs = await getJobListings()

    const matchingQueryJobs = (query) ? _matchTags(allJobs, query) : _matchTags(allJobs)
    const finalJobs = _matchLocation(_buildJobItems(matchingQueryJobs))

    if (offset * limit >= finalJobs.length) return []

    if (finalJobs.length <= (offset * limit) + limit) {
      return finalJobs.slice(offset * limit)
    } else {
      return finalJobs.slice(offset * limit, (offset * limit) + limit)
    }
  }

  /**
   * Get ads with the specified search criteria.
   * If no criteria is specified, jobs containing the tag "dev" will be returned.
   *
   * @param {object} query - Object containing the search query
   * @returns {JobItem[]} - The job items from Remoteok API
   */
  async getAds (query) {
    try {
      let search = await getJobListings()

      if (query.searchString) {
        search = _matchTags(search, query.searchString)
      } else {
        search = _matchTags(search)
      }

      const jobs = _buildJobItems(search)
      const filteredJobs = _matchLocation(jobs)

      return filteredJobs
    } catch (error) {
      console.log(error)
    }
  }
}

/**
 * Returns a list that only contain jobs tagged with the specified search critiera.
 * @param {Object[]} items - The array of job ads to match against the specified tag
 * @param {string} query - The query string to match
 */
const _matchTags = (items, query) => {
  const found = []
  let tags = ['dev'] // placeholder in case query doesn't have a value

  if (query) {
    tags = []

    // if the search string consists of more than one word
    if (/\s/.test(query)) {
      const str = query.toLowerCase().split(' ')
      tags = [...tags, ...str]
    } else {
      tags.push(query.toLowerCase())
    }
  }

  tags.forEach((str) => {
    for (const item of items) {
      const yes = item.tags.some((value) => value.indexOf(str) > -1)
      if (yes) {
        found.push(item)
      }
    }
  })

  return [...new Set(found)]
}

/**
 * Re-shapes a list of job ads to conform to Softworks specification.
 * @param {Object[]} items - The array of job ads to build according to the specified criteria in regards to the API
 * @returns
 */
const _buildJobItems = (items) => {
  const jobs = items.map((item) => ({
    title: item.position,
    description: item.description.replace(/(\r\n|\n|\r|\<.*?\>)/gm, ' ').trim(),
    company: item.company,
    publishedDate: item.date,
    url: item.url,
    remote: 'true',
    location: {
      municipality: 'remote',
      region: 'remote',
      country: item.location
    },
    source: 'RemoteOK'
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
