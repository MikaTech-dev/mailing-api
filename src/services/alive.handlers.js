// const sendResponse = require ("../utils/responseMiddleware")
import sendResponse from "../utils/responseMiddleware.js"
import { verifyTransport } from "./email/nodemail.handler.js";

/* Is server alive? */

export default async (req, res)=> {
    try {
        verifyTransport()
        sendResponse(res, 200, true, "Server is alive, SMTP server operational", )
        console.log(req.ip, "Server is alive");
    }catch(error) {
        sendResponse(res, 500, false, "An internal server error occurred, view logs for more details", null, error)
        console.log("An error occured: ", error);
    }
}