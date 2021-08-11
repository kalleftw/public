// all routes for the application
import express from 'express'
import { router as platsbankenRouter } from './platsbanken-router.js'
import { router as remotiveRouter } from './remotive-router.js'
import { router as remoteokRouter } from './remoteok-router.js'
import { getAds } from '../controllers/index.js'

export const router = express.Router()

router.use('/platsbanken', platsbankenRouter)
router.use('/remotive', remotiveRouter)
router.use('/remoteok', remoteokRouter)
router.get('/', getAds)
