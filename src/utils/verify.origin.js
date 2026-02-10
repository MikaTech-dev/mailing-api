import "dotenv/config"

const websites = process.env.WEBSITES
const websiteArray = websites.split(",")

export const verifyTraffic = async ()=>{
    // WIthout promise

    // function verify () {if (websiteArray.includes(req.hostame)) return true; else {return false};}
    function verify() {
        if (websiteArray.includes("localhost")) {
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

export const verifyHostname = async (req, res) => {
    return new Promise ((resolve, reject) => {
        const reqSource = req.hostname
        if (websiteArray.includes(reqSource)){
            console.log(`Requests from ${reqSource}`)
            resolve("Origin Validated")   // True if req source is allowed
        }else {
            console.log (`Request from ${reqSource} couldnt be fulfilled`)
            reject(new Error ("Access denied: Host not allowed."))
        }
    })
}