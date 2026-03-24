import "dotenv/config"
import { logger } from "./logger.config.js"
import sendResponse from "./response.middleware.js"
const websites = process.env.WEBSITES
const allowedSites = websites.split(",")
const websiteSet = new Set(allowedSites)    // transform list into a set for O(1) time complexity

// Promise to verify request origin
// something of our own inhouse CORS policy
const verifyOrigin = (req, ) => {
    return new Promise ((resolve, reject) => {
        const reqOrigin = req.header("Origin")
        const reqMode = req.header("sec-fetch-mode") //Browser likely header, checks req mode is https 
        // Allow browser traffic
        logger.info("Request mode:", reqMode);
        
        if (!reqOrigin) {
            logger.error (`Access denied from origin ${reqOrigin}, bad origin`)
            reject (new Error ("Access denied: Origin not recognized"))
        }
        
        if (!reqOrigin && reqMode) {
            logger.warn(`No Origin header present (${reqOrigin}) (Likely Same-Origin or Server-side request).`);
            resolve("Origin Validated (No Origin Header, origin likely web-browser)");
        }
        if (websiteSet.has(reqOrigin)){    // if origin is in websiteSet
            logger.debug(`Request from valid origin ${reqOrigin}`)
            resolve("Origin Validated")         
        }else {
           logger.error (`Request from ${reqOrigin} with http req mode of ${reqMode}, couldnt be fulfilled`)
            reject(new Error ("Access denied: Origin not authorized."))
        }
    })
}
// You could relinquish the need for a promise by just making the above an async function

const verifyAuth = async(req, res) => {
    const validKeys = process.env.VALID_KEYS
    const authKeysArray = validKeys.split(",")
    const authKeySet = new Set(authKeysArray)
    const authKey = await req.get("authv1")

    if (authKeySet.has(authKey)) {
        logger.info("Req origin has valid auth key")
        return true
    } else {
        logger.error("Authentication key not present or invalid authentication code")
        sendResponse(res, 500, false, "Authentication key not present or invalid authentication key")
        return false
    }
}

export {verifyOrigin, verifyAuth}