import express from "express"
import isAlive from "./handlers/alive.handlers.js"
const router = express.Router()


// Is the server alive?
export default router.get("/", isAlive)