import express from "express"
import isAlive from "./services/alive.handlers.js"
const router = express.Router()


// Is the server alive?
router.get("/", isAlive)

// get  

export default router