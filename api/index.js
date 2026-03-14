import "dotenv/config"
import express from "express"
import indexRoutes from "./routes/index.routes.js"
import loginRoutes from "./routes/login.routes.js"
import userRoutes from "./routes/users.routes.js"

const app = express()

app.use(express.json())
app.use(indexRoutes)
app.use(loginRoutes)
app.use(userRoutes)

const PORT = 8000

app.listen(PORT, console.log("http://localhost:" + PORT))