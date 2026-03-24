//dotenv config
import "dotenv/config"
import express from "express"
import morgan from "morgan"
import router from "./src/services/routing/routes.js"
import { verifySMTP } from "./src/utils/smtp.verify.js"
import { verifyAuth } from "./src/utils/verify.origin.js"
import contentNegotiator from "./src/utils/content.negotiator.js"
import cors from "cors"
import limiter from "./src/utils/rate.limit.js"
import { logger } from "./src/utils/logger.config.js"

const app = express()
// Morgan config
app.use(morgan("dev", {
    stream: { write: (message) => logger.info(message.trim()) }
}))


app.use(limiter)
// Cors
app.use(cors({methods: "GET, POST"}))


// Enforce json only content-type
app.use(contentNegotiator)

// Verify origin on every request
app.use( async (req, res, next)=> {
    const isValid = await verifyAuth(req, res)
    if (isValid) {
        next()
    }
})

app.use(express.json())


// Server config and startup
const PORT = process.env.NODE_PORT || 5000
const HOSTNAME = "0.0.0.0"

app.listen (PORT, HOSTNAME, ()=> {
    (async () => {
        try {
            await verifySMTP() // Verify SMTP connection on startup.
            logger.info("☑️  SMTP Verified");
            logger.info(`☑️  Server started at http://${HOSTNAME}:${PORT}`)
            app.use("/api", router)
        } catch (error) {
            logger.error("🚫  Error occurred while starting the server", error)
        }
    })()
})