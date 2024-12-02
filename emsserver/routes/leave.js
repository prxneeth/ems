import express from 'express'
const router = express.Router()
import authMiddleware from '../middleware/authMiddleware.js'
import { addLeave, getLeave, getLeaves, getLeaveDetail, updateLeave } from '../controllers/leaveController.js'



router.get('/', authMiddleware, getLeaves)
router.get('/detail/:id', authMiddleware, getLeaveDetail)
router.post('/add', authMiddleware, addLeave)
router.get('/:id/:role', authMiddleware, getLeave)
router.put('/:id', authMiddleware, updateLeave)


export default router