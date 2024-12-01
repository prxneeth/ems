import express from 'express'
const router = express.Router()
import authMiddleware from '../middleware/authMiddleware.js'
import { getEmployees, addEmployee, upload, getEmployee, updateEmployee } from '../controllers/employeeController.js'


router.get('/', authMiddleware, getEmployees)
router.post('/add', authMiddleware, upload.single('image'), addEmployee)
router.get('/:id', authMiddleware, getEmployee)
router.put('/:id', authMiddleware, updateEmployee)
// router.delete('/:id', authMiddleware, deleteDepartment)

export default router