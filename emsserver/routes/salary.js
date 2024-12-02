import express from 'express'
const router = express.Router()
import authMiddleware from '../middleware/authMiddleware.js'
import { addSalary, getSalary } from '../controllers/salaryController.js'



router.post('/add', authMiddleware, addSalary)
router.get('/:id/:role', authMiddleware, getSalary)


export default router