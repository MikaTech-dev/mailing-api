//dotenv config
import "dotenv/config"
import express from "express"
import morgan from "morgan"
import router from "./src/services/routing/routes.js"
import { verifyGoogleTransport } from "./src/services/email/nodemail.handler.js"
// const cors = require ("cors")

const app = express()
// Todo: config cors security policy


// Cors

// if (process.env.NODE_ENV == "production"){
//     app.use(cors({
//         origin: "http"
//     }))
// }

// Morgan config
app.use(morgan("dev"))

app.use(express.json())
app.use("/api", router)


// Server config and startup
const PORT = process.env.NODE_PORT || 5000

app.listen (PORT, ()=> {
    try {
        console.log (`☑️  Server started at http://localhost:${PORT}`)
        verifyGoogleTransport() // Verify SMTP connection on startup.
    } catch (error) {
        console.log ("🚫  Error occurred while starting the server", error)
    }
})