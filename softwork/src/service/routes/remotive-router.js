/**
 * Remotive routes
 */

import express from 'express'
import Remotive from '../remotive/Remotive.js'

export const router = express.Router()

const controller = new Remotive()

router.post('/ads', controller.getAds)
router.get('/categories', controller.getCategories)
