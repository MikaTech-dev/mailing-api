import gmailTransporter from "../../utils/nodemail.config.js";
// import sendResponse from "../../utils/response.middleware.js";
import { mailTemplate } from "./email.template.js";

// Verify Google SMTP connection
const verifyGoogleTransport = () => {
    // since the .verify method is a promise
    // gmailTransporter.verify().then(
    //     (promiseResult)=>{
    //         console.log("☑️ Google SMTP connection established, Authenticated: " + promiseResult)
    //     }
    // ).catch(
    //     (promiseResult)=>{
    //         console.log ("Error occurred while authenticating google SMTP: " + promiseResult)
    //         throw new Error ("Failed to auth SMTP server")
    //     }
    // )
    try {
        (async ()=>{
            const transporterResult = await gmailTransporter.verify().then(
                (result)=>{
                    console.log("✅ Google SMTP connection established, Authenticated: ", result)
                }
            )
            const data = {
                transporterAuthenticated: transporterResult
            }
            return data
        })()
        
    } catch (err) {
        console.error("Failed to authenticate Google SMTP", err)
        throw new Error("Failed to auth SMTP server: ", err);
    }
}

// TODO: Add switch case to use mailtrap client when available, else use fallback gmail service

// Send email logic, takes in the origin site, name, 
const sendEmail = async (name, email, phone, message, website, recipient) => {
    // Control what sites can send an email
    let websites = process.env.WEBSITES
    try {
        // Clean up send email/remove prvious attempt to reject bad hostnames, ensure to reject in route.logic.js instead
        if (website in websites.split(",")) (
            await gmailTransporter.sendMail({
                from: process.env.GMAIL_SENDER,
                to: recipient,
                subject: "Someone is trying to reach you!!",
                html: mailTemplate(name, email, phone, message, website)
            })
        )
        throw new Error("This domain isn't allowed to send requests");
    } catch (error) {
        console.log("An error occurred: ", error)
    }
}

export {verifyGoogleTransport, sendEmail}