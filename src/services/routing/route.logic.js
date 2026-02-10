import sendResponse from "../../utils/response.middleware.js"
import {verifyHostname} from "../../utils/verify.origin.js";
import { sendEmail } from "../email/nodemail.handler.js";

/* Is server alive? */

const isAlive = async (req, res)=> {
    try {
        // await verifyGoogleTransport()
        const msg = await verifyHostname(req, res)
        sendResponse(res, 200, true, msg )
        // if (req.hostname in websites.split(",")) console.log(true); else console.log(typeof req.hostname)
        // TODO: add match case using regex to check if the hostname is in the new websites array (might use string instead of array)
    }catch(error) {
        sendResponse(res, 500, false, "An internal server error occurred, view logs for more details", null, error.message)
        console.error("An error occured checking the server: ", error);
    }
}

const emailRequest = async (req, res) => {
    await verifyHostname(req, res).then(
        () => {
            // TODO: Add logic to parse req.body for email/origin details and then sendemail with the relevant details.
        }
    )   // TODO: Add catch case to throw error if hostname check fails/rejects for any reason
}

export { isAlive, emailRequest }