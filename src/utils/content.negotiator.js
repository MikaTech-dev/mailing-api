import { logger } from "./logger.config.js";
import sendResponse from "./response.middleware.js"


// Note this async lambda acts as a method/request controller, considering cors seems not to be working, we will be controlling allowed methods from here
export default async (req, res, next)=> {
    try {
        if (req.method != "GET" && !(req.is("application/json")) ) {
            logger.error ("Unsupported content-type")
            throw new Error("Unsupported Media Type")
        }
        else if (req.method === "GET" && !(req.is("application/json"))) {
            logger.info (`Recieved request with excuse: ${req.method}`);
        }
    } catch (error) {
        sendResponse(res, 415, false, error.message, "Ensure headers are set to application/JSON and try again")
        logger.error (`Recieved bad content type ${req.get("content-type")}. Error:\n ${error}`);
        return
    }
    next()
}