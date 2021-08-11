import bcrypt from 'bcrypt'
import validator from 'validator'
import {
  User
} from '../model/User.js'

/**
 * User Controller.
 *
 * @author ph222ue (Patrik Hasselblad).
 * @version 1.0.0
 */
export class UserController {
  /**
   * Function that register users to the system.
   */
  async register (req, res) {
    try {
      const email = req.body.email.toLowerCase()
      const salt = bcrypt.genSaltSync(10)
      const password = await bcrypt.hashSync(req.body.password, salt)
      const user = new User({
        email: email,
        password: password
      })

      await user.save()
      res.status(200).send(['success'])
    } catch (err) {
      console.log(err)
      res.status(500).send(['failure'])
    }
  }

  /**
   * Function that checks the attempted user against the database.
   */
  async login (req, res) {
    try {
      if (req.session.user) { // If a user is already logged in
        res.status(404).send()
      } else {
        await User.findOne({
          email: req.body.email.toLowerCase()
        }).then((attemptedUser) => {
          if (attemptedUser && bcrypt.compareSync(req.body.password, attemptedUser.password)) {
            req.session.save(function () {
              req.session.user = {
                user: req.body.email.toLowerCase()
              }
              const json = req.session.user
              res.status(200)
              res.send(['success', json])
            })
          } else {
            res.send(['Wrong credentials'])
          }
        })
      }
    } catch {
      res.status(500).send(['failure'])
    }
  }

  /**
   * Function that destroys the session.
   */
  logout (req, res) {
    try {
      if (req.session.user) {
        req.session.destroy(function () {
          res.status(200).send() // .send(['Successfully logged out']) Successfully logged in.
        })
      } else {
        res.status(404).send()
      }
    } catch (err) {
      res.status(500).send(['Internal error'])
    }
  }

  /**
   * Function that helps secure software from malicious data.
   */
  cleanUp (req, res, next) {
    if (typeof (req.body.email) !== 'string') {
      res.status(403).send(['Error, invalid format.'])
    } else {
      next()
    }
  }

  /**
   * Validates the incoming data.
   */
  async dataValidation (req, res, next) {
    const errors = []
    // Checking cridentials.

    // Destroys session if a previous user is logged in
    if (req.session.user) {
      req.session.destroy()
    }

    try {
      if (validator.isEmail(req.body.email)) {
        const exists = await User.findOne({
          email: req.body.email
        })
        if (exists) {
          errors.push('The email is already in use')
        }
      } else if (!validator.isEmail(req.body.email)) {
        errors.push('Error, invalid email format.')
      }

      if (req.body.password.length < 8) {
        errors.push('Password must contain atleast 8 characters.')
      }

      if (errors.length) {
        res.send(errors)
      } else {
        next()
      }
    } catch (err) {
      res.send(['Internal error'])
    }
  }

  /**
   * Checks if user is logged in
   */
  loginCheck (req, res, next) {
    if (req.session.user) {
      res.status(403).send()
    } else {
      next()
    }
  }
}
