import Platsbanken from './Platsbanken.js'
import dotenv from 'dotenv'

dotenv.config()

test('correctly constructs API query string from object of criteria', () => {
  const pb = new Platsbanken(process.env.PLATSBANKEN_KEY)
  const result = pb._getQueryString({
    region: 'Skåne',
    municipality: 'Helsingborg',
    q: 'Javautvecklare',
    offset: 1,
    limit: 2
  })
  const expected = 'region=Skåne&municipality=Helsingborg&q=Javautvecklare&offset=1&limit=2&occupation-name=rQds_YGd_quU'

  expect(result).toBe(expected)
})

test('can make basic API call without criterion', done => {
  const pb = new Platsbanken(process.env.PLATSBANKEN_KEY)
  pb.getAds({}, 0, 1).then(() => done())
})

test('ad output conforms to interface for JobItem', done => {
  function callback(data) {
    try {
      expect(data.title).toBeDefined()
      expect(typeof data.title ===  'string').toBe(true)

      expect(data.description).toBeDefined()
      expect(typeof data.description ===  'string').toBe(true)

      expect(data.company).toBeDefined()
      expect(typeof data.company ===  'string').toBe(true)

      expect(data.publishedDate).toBeDefined()
      expect(typeof data.publishedDate ===  'string').toBe(true)

      expect(data.url).toBeDefined()
      expect(typeof data.url ===  'string').toBe(true)

      expect(data.logoURL).toBeDefined()
      expect(typeof data.logoURL ===  'string' || data.logoURL ===  null).toBe(true)

      expect(data.location).toBeDefined()
      expect(typeof data.location === 'object').toBe(true)

      expect(data.location.municipality).toBeDefined()
      expect(typeof data.location.municipality === 'string').toBe(true)
      
      expect(data.location.region).toBeDefined()
      expect(typeof data.location.region === 'string').toBe(true)

      expect(data.location.country).toBeDefined()
      expect(typeof data.location.country === 'string').toBe(true)

      done()
    } catch (error) {
      done(error)
    }
  }

  const pb = new Platsbanken(process.env.PLATSBANKEN_KEY)
  pb.getAds({}, 0, 1).then(ads => callback(ads[0]))
})
