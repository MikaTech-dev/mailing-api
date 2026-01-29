// const sendResponse = require ("../utils/responseMiddleware")
import sendResponse from "../utils/responseMiddleware.js"

/* Is server alive? */

export default async (req, res)=> {
    sendResponse(res, 200, true, "Server is alive", )
    console.log(req.ip, "Server is alive");
}