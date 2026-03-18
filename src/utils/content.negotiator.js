import sendResponse from "./response.middleware.js"


// Note this async lambda acts as a method/request controller, considering cors seems not to be working, we will be controlling allowed methods from here
export default async (req, res, next)=> {
    try {
        if (req.method != "GET" && !(req.is("application/json")) ) {
            throw new Error("Unsupported Media Type")
        }
        else if (req.method === "GET" && !(req.is("application/json"))) {
            console.log(`${req.ip} - Recieved supported content type ${req.get("content-type")}`);
        }
    } catch (error) {
        sendResponse(res, 415, false, error.message, "Ensure your headers are set to application/JSON and try again")
        console.log(`${req.ip} - Recieved bad content type ${req.get("content-type")}. Error:\n ${error}`);
        return
    }
    next()
}