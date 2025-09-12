import express from 'express'
import cors from 'cors'
import connectDB from './config/db.js'
import authRoutes from "./routes/auth.js"
import apiRoutes from "./routes/api.js"


const PORT = 5000
const app = express()
app.use(express.json())
app.use(cors())

connectDB();


app.use("/auth", authRoutes);

app.use("/", apiRoutes);





app.listen(PORT, () => {
    console.log(`listening on port: ${PORT}`)
})