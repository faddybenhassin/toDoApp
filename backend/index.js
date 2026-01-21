import express from 'express'
import cors from 'cors'
import connectDB from './config/db.js'
import authRoutes from "./routes/auth.js"
import apiRoutes from "./routes/api.js"
import { port } from './config/key.js'

const PORT = port
const app = express()
app.use(express.json())
app.use(cors())

connectDB();


app.use("/auth", authRoutes);

app.use("/api", apiRoutes);





app.listen(PORT, () => {
    console.log(`listening on port: ${PORT}`)
})