import { logger } from "../../utils/logger.config.js";
import { mailTemplate } from "./email.template.js";
import { gmailTransporter, mailtrapTransporter } from "../../utils/nodemail.config.js";


// Send email logic
// Send email with mailtrap function
const sendWithMailtrap = async (name, email, phone, message, website, recipient) => {
    try {
        logger.info (`📨 Sending mail with mailtrap from ${process.env.MAILTRAP_SENDER} to ${recipient}`)
        const info = await mailtrapTransporter.sendMail({
            from: process.env.MAILTRAP_SENDER,
            to: recipient,
            subject: "Someone is trying to reach you!!",
            html: mailTemplate(name, email, phone, message, website, recipient)
        })
        logger.info ("Sent email with mailtrap, \ninfo: ", info)
        return info

    } catch (error) {
        console.error("Failed to send email: \n", error)
        throw new Error (error)
    }
}



// Send email with google SMTP
const sendWithGoogle = async (name, email, phone, message, website, recipient) => {
    try {
        logger.info (`📨 Sending mail with gmail from ${process.env.GMAIL_SENDER} to ${recipient}`)
        const info = await gmailTransporter.sendMail ({
                from: process.env.GMAIL_SENDER,
                to: recipient,
                subject: "Someone is trying to reach you!!",
                html: mailTemplate(name, email, phone, message, website, recipient)
            })
        logger.info ("Sent email with google SMTP, \ninfo " + info)
        return info

    } catch (error) {
        console.error("Failed to send email: ", error)
        throw new Error (`Failed to send email: \n${error}`)
    }
}



export {sendWithMailtrap, sendWithGoogle}