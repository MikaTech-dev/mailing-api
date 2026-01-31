import express from "express"
import isAlive from "./services/alive.handlers.js"
const router = express.Router()


// GET server status.
router.get("/", isAlive)

// CREATE/SEND new email.
// router.post("/")
export default router