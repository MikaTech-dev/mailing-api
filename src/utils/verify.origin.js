import "dotenv/config"


const websites = process.env.WEBSITES
const allowedSites = websites.split(",")

const websiteSet = new Set(allowedSites)    // transform list into a set for O(1) time complexity

// Promise to verify request origin
// something of our own inhouse CORS policy
export const verifyOrigin = (req, ) => {
    return new Promise ((resolve, reject) => {
        const reqOrigin = req.header("Origin")
        const reqMode = req.header("sec-fetch-mode") //Browser likely header, checks req mode is https 
        // Allow browser traffic
        console.log("Request mode:", reqMode);
        
        if (!reqOrigin) {
            console.log(`Access denied from origin ${reqOrigin}, bad origin`)
            reject (new Error ("Access denied: Origin not recognized"))
        }
        
        // Allow request if its from undefined origin but
        if (!reqOrigin && reqMode) {
            console.log(`No Origin header present (${reqOrigin}) (Likely Same-Origin or Server-side request).`);
            resolve("Origin Validated (No Origin Header, origin likely web-browser)");
        }
        // TODO: Consider setting up and preferring api-key for request and origin validation instead of just cors.
        if (websiteSet.has(reqOrigin)){    // if origin is in websiteSet
            console.log(`Request from valid origin ${reqOrigin}`)
            resolve("Origin Validated")         
        }else {
            console.log (`Request from ${reqOrigin} with http req mode of ${reqMode}, couldnt be fulfilled`)
            reject(new Error ("Access denied: Origin not authorized."))
        }
    })
}
// You could relinquish the need for a promise by just making the above an async function