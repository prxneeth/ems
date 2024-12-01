import express from 'express'
import cors from 'cors'
import connectToDatabase from './db/db.js'


import authRouter from './routes/auth.js'
import departmentRouter from './routes/department.js'
import employeeRouter from './routes/employee.js'


connectToDatabase()
const app = express()
app.use(cors())
app.use(express.json())
app.use(express.static('public/uploads'))
app.use('/api/auth', authRouter)
app.use('/api/department', departmentRouter)
app.use('/api/employee', employeeRouter)




app.get('/', (req, res) => {
    res.send("hello hello")
})

app.listen(process.env.PORT, () => {
    console.log(`server is running at port ${process.env.PORT}`)
})