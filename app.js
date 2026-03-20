//dotenv config
import "dotenv/config"
import express from "express"
import morgan from "morgan"
import router from "./src/services/routing/routes.js"
import { verifySMTP } from "./src/utils/smtp.verify.js"
import { verifyOrigin } from "./src/utils/verify.origin.js"
import contentNegotiator from "./src/utils/content.negotiator.js"
import cors from "cors"
import limiter from "./src/utils/rate.limit.js"

const app = express()
// Morgan config
app.use(morgan("dev"))


app.use(limiter)
// Cors
app.use(cors({methods: "GET, POST"}))


// Enforce json only content-type
app.use(contentNegotiator)

// Verify origin on every request
app.use( async (req, res, next)=> {
    await verifyOrigin(req, res)
    next()
})

app.use(express.json())


// Server config and startup
const PORT = process.env.NODE_PORT || 5000
const HOSTNAME = "0.0.0.0"

app.listen (PORT, HOSTNAME, ()=> {
    (async () => {
        try {
            await verifySMTP() // Verify SMTP connection on startup.
            console.log("☑️  SMTP Verified");
            console.log (`☑️  Server started at http://${HOSTNAME}:${PORT}`)
            app.use("/api", router)
        } catch (error) {
            console.log ("🚫  Error occurred while starting the server", error)
        }
    })()
})