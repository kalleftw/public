import axios from 'axios'
import {
  User
} from '../model/User.js'

/**
 * Main controller
 * @author (ph222ue) Patrik Hasselblad
 * @version 1.0.0
 */
export class MainController {
  async search (req, res) {
    try {
      // Get ads from job service.
      const ads = await axios.get(process.env.SERVICE_ADDRESS, {
        params: {
          search: req.query.search,
          region: req.query.region,
          municipality: req.query.municipality,
          remote: req.query.remote,
          offset: req.query.offset
        }
      })

      res.send(ads.data)
    } catch (err) {
      res.status(500).send('Failure')
    }
  }

  /**
   * Add an add as favourite to the current user
   */
  async addFavourite (req, res) {
    try {
      if (req.session.user.user === req.body.ad.user) {
        const newUser = await User.findOne({
          email: req.body.ad.user
        })

        // Check if favourite exists then add
        for (let i = 0; i < newUser.favourites.length; i++) {
          if (req.body.ad.url === newUser.favourites[i].url) {
            res.send(['Add is already saved in favourites.'])
            return
          }
        }

        newUser.favourites.push({
          title: req.body.ad.title,
          company: req.body.ad.company,
          location: req.body.ad.location,
          description: req.body.ad.description,
          url: req.body.ad.url,
          remote: req.body.ad.remote,
          source: req.body.ad.source,
          logoURL: req.body.ad.logoURL
        })
        await newUser.save()

        res.send(['Add successfully added to favourites.'])
      } else {
        res.send(['You must be logged in to add favourite'])
      }
    } catch (err) {
      res.send(['error'])
    }
  }

  /**
   * Remove an add from the current user
   */
  async removeFavourite (req, res) {
    try {
      if (req.body.user === req.session.user.user) {
        const newUser = await User.findOne({
          email: req.body.user
        })

        // Check if favourite exists then add
        for (let i = 0; i < newUser.favourites.length; i++) {
          if (req.body.url === newUser.favourites[i].url) {
            newUser.favourites.splice(i, 1)
            await newUser.save()
            res.send(['Add successfully removed from favourites.'])
          }
        }
      } else {
        res.send(['You are not logged in'])
      }
    } catch (err) {
      res.send(['error'])
    }
  }

  /**
   * Returns the add/adds of the current user
   */
  async viewFavourite (req, res) {
    if (req.session === undefined) {
      res.status(404).send()
    } else {
      try {
        const newUser = await User.findOne({
          email: req.session.user.user
        })

        if (newUser) {
          const arrayToSend = newUser.favourites
          res.status(200).send(arrayToSend)
        }
      } catch (err) {
        res.status(500).send(['Error'])
      }
    }
  }
}
