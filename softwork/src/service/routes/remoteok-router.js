/**
 * Remoteok routes
 */

import express from 'express'
import Remoteok from '../remoteok/Remoteok.js'

export const router = express.Router()

const controller = new Remoteok()

router.post('/ads', controller.getAds)
