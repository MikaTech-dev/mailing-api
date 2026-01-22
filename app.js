//dotenv config
require ("dotenv").config()
// Essential imports
const express = require ("express")
const morgan = require("morgan")
// const cors = require ("cors")

const app = express()
// Morgan config
app.use(morgan("dev"))

// Cors

// if (process.env.NODE_ENV == "production"){
//     app.use(cors({
//         origin: "http"
//     }))
// }

// Server config and startup
const PORT = process.env.NODE_PORT || 5000

app.listen (PORT, ()=> {
    try {
        console.log (`☑️ Server started at http://localhost:${PORT}`)
    } catch (error) {
        console.log ("🚫 Error occurred while starting the server", error)
    }
})

app.use("/api", require("./src/routes/alive.route"))