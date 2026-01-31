import transporter from "../../utils/nodemail.config.js";
import sendResponse from "../../utils/responseMiddleware.js";
import { mailTemplate } from "./email.template.js";

// Verify Transport/SMTP functionality
const verifyTransport = () => {
    // .verify method is a promise
    transporter.verify().then(
        (promiseBool)=>{
            console.log("✅ SMTP connection successfully Authenticated: "+ promiseBool)
        }
    ).catch(
        (promiseBool)=>{console.log ("Error occurrd while authenticating: " + promiseBool)}
    )
}

// Send email logic, takes in the origin site, name, 
const sendEmail = async (name, email, phone, message, website) => {
    // Control what sites can send an email
    let websites = process.env.WEBSITES
    try {
        if (website in websites.split(",")) (
            await transporter.sendMail({
                from: process.env.SENDER,
                to: process.env.RECIPIENT,
                subject: "Someone is trying to reach you!!",
                html: mailTemplate(name, email, phone, message, website)
            })

        )
    } catch (error) {
        console.log("An error occurred: ", error)
    }
    
}

export {verifyTransport, sendEmail}