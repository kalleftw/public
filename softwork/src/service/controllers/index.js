import Platsbanken from '../platsbanken/Platsbanken.js'
import Remotive from '../remotive/Remotive.js'
import Remoteok from '../remoteok/Remoteok.js'
import dotenv from 'dotenv'

dotenv.config()

const pb = new Platsbanken(process.env.PLATSBANKEN_KEY)
const ro = new Remoteok()
const re = new Remotive()

/**
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @author Jon Cavallie Mester
 */
const getAds = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 20
    const offset = parseInt(req.query.offset) || 0
    // Hur många ads från platsbanken t.ex.
    // Sätter lika med limit tills de resterande
    // API-klasserna är klara
    const limitPb = (req.query.remote === 'true') ? limit / 2 : limit
    const limitRemote = limitPb / 2

    const query = {
      country: req.query.country,
      region: req.query.region,
      municipality: req.query.municipality,
      q: req.query.search,
      remote: req.query.remote
    }

    let additionalAdsNeeded = 0

    let roAds = []
    let reAds = []

    if (query.remote === 'true') {
      roAds = await ro.getAdList(query.q, offset, limitRemote)
      additionalAdsNeeded = limitRemote - roAds.length

      reAds = await re.getAds(query.q, offset, limitRemote + additionalAdsNeeded)
      additionalAdsNeeded = (limitRemote + additionalAdsNeeded) - reAds.length
    }

    const pbAds = await pb.getAds(
      { country: query.country, region: query.region, municipality: query.municipality, q: query.q },
      limitPb * offset,
      limitPb
    )

    const finalJobList = [...pbAds, ...roAds, ...reAds]
    return res.status(200).send(finalJobList)
  } catch (error) {
    res.status(500).send('Something went wrong.')
  }
}

export { getAds }
