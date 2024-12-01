import express from 'express'
const router = express.Router()
import authMiddleware from '../middleware/authMiddleware.js'
import { addLeave, getLeaves } from '../controllers/leaveController.js'



router.post('/add', authMiddleware, addLeave)
router.get('/:id', authMiddleware, getLeaves)


export default router