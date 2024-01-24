import dotenv from "dotenv"
dotenv.config()
import express from "express"
import cors from "cors"
import Constants from "./constants.js"
import * as middleware from "./api/middleware.js"
import * as apis from "./api/api.js"

const PORT = Constants.port ?? 3000

const app = express()
app.use(cors())
app.use(middleware.apiKey)
app.get("/games", apis.games)
app.get("/tables/:gameId", apis.tables)
app.get("/table/:gameId/:tableId", apis.table)
app.get("/table/:gameId/:tableId/random", apis.random)

app.listen(PORT, () => {
    console.log(`API is listening on http://localhost:${PORT}`)
})