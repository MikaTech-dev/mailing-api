import "dotenv/config"

const websites = process.env.WEBSITES
const allowedSites = websites.split(",")

export const verifyTraffic = async ()=>{
    // WIthout promise

    // function verify () {if (allowedSites.includes(req.hostame)) return true; else {return false};}
    function verify() {
        if (allowedSites.includes("localhost")) {
            console.log("Includes indeed")
            return true
        }
        else throw new Error ("Bad Host")
    }
    console.log(verify())
    // return new Promise((resolve, reject)=>{
    //     if (verify()) {
    //         resolve(verify)
    //     }
    //     reject(new Error ("Bad IP"))
    // })
    
}

// Promise to verify request origin
// something of our own inhouse CORS policy
export const verifyOrigin = (req, ) => {
    return new Promise ((resolve, reject) => {
        const reqOrigin = req.header("Origin")
        const reqMode = req.header("sec-fetch-mode") //Browser likely header, checks req mode is https 
        // Allow browser traffic
        console.log(reqOrigin)
        console.log(reqMode);

        const websiteSet = new Set(allowedSites)    // create set for O(1) time complexity
        console.log(websiteSet)

        // Deny access if request isnt from a valid origin, prevents requests from web browsers because they have no origin by default.
       /*  if (!reqOrigin) {
            console.log(`Access denied from origin ${reqOrigin}, bad origin`)
            reject (new Error ("Access denied: Origin not recognized"))
        } */
        
        // Allow request if its from undefined origin but
        if (!reqOrigin && reqMode) {
            console.log(`No Origin header present (${reqOrigin}) (Same-Origin or Server-side request).`);
            return resolve("Origin Validated (No Origin Header, origin likely web-browser)");
        }
        // TODO: Consider setting up and preferring api-key for request and origin validation instead of just cors.
        else if (websiteSet.has(reqOrigin)){    // if origin is in websiteSet
            console.log(`Request from valid origin ${reqOrigin}`)
            resolve("Origin Validated")         
        }else {
            console.log (`Request from ${reqOrigin} with http req mode of ${reqMode}, couldnt be fulfilled`)
            reject(new Error ("Access denied: Origin not authorized."))
        }
    })
}
// You could relinquish the need for a promise by just making the above an async function