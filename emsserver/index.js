import express from 'express'
import cors from 'cors'
import authRouter from './routes/auth.js'
import connectToDatabase from './db/db.js'

import departmentRouter from './routes/department.js'


connectToDatabase()
const app = express()
app.use(cors())
app.use(express.json())
app.use('/api/auth', authRouter)
app.use('/api/department', departmentRouter)




app.get('/', (req, res) => {
    res.send("hello hello")
})

app.listen(process.env.PORT, () => {
    console.log(`server is running at port ${process.env.PORT}`)
})