import express from "express"
import { isAlive } from "./route.logic.js"
const router = express.Router()


// GET server status.
router.get("/", isAlive)

// CREATE/SEND new email.
// router.post("/")
export default router