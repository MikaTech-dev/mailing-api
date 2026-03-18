//dotenv config
import "dotenv/config"
import express from "express"
import morgan from "morgan"
import router from "./src/services/routing/routes.js"
import { verifySMTP } from "./src/utils/smtp.verify.js"
import { verifyOrigin } from "./src/utils/verify.origin.js"
import contentNegotiator from "./src/utils/content.negotiator.js"
import cors from "cors"

const app = express()
// Todo: config cors security policy


// Cors
app.use(cors({origin: "http://localhost:5173", methods: "GET, POST"}))


// Enforce json only content-type
app.use(contentNegotiator)

// Verify origin on every request
app.use( async (req, res, next)=> {
    await verifyOrigin(req, res)
    next()
})

// Morgan config
if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"))
}

app.use(express.json())


// Server config and startup
const PORT = process.env.NODE_PORT || 5000

app.listen (PORT, ()=> {
    (async () => {
        try {
            console.log (`☑️  Server started at http://localhost:${PORT}`)
            await verifySMTP() // Verify SMTP connection on startup.
            app.use("/api", router)
        } catch (error) {
            console.log ("🚫  Error occurred while starting the server", error)
        }
    })()
})