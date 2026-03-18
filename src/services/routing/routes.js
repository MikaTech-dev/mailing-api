import express from "express"
import { emailRequest, isAlive } from "./route.logic.js"
const router = express.Router()


// GET server status.
router.get("/", isAlive)

// CREATE/SEND new email.
router.post("/mail", emailRequest)
export default router