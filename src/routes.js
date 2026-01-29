import express from "express"
import isAlive from "./services/alive.handlers.js"
const router = express.Router()


// Is the server alive?
export default router.get("/", isAlive)