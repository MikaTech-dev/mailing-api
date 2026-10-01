import express from "express"
import { emailRequest, healthCheck } from "./route.logic.js"
const router = express.Router()


// GET server status.
router.get("/", healthCheck)

// CREATE/SEND new email.
router.post("/mail", emailRequest)
export default router