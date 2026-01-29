import transporter from "../utils/nodemail.config.js";
import sendResponse from "../utils/responseMiddleware.js";

const verifyTransport = () => {
    // .verify method is a promise
    transporter.verify().then(
        (promiseState)=>{
            console.log("Successfully Authenticated: "+ promiseState)
        }
    ).catch(
        (promiseState)=>{console.log ("Error occurrd while authenticating" + promiseState)}
    )
}

export {verifyTransport}