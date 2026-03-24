import { logger } from "./logger.config.js";
import { sendWithGoogle, sendWithMailtrap } from "../services/email/email.send.js";
import { verifyMailtrap, verifyGoogleSMTP, verifySMTP } from "./smtp.verify.js"


const serviceSelector = async (name, phone, email, message, website, recipient)=> {
    try {
        const smtpResult = await verifySMTP()   // Returns keys: Mailtrap & GoogleSMTP

        if ( !(smtpResult.Mailtrap) ) {    
            // Send with GoogleSMTP when Mailtrap is down
            logger.warn ("Selector has chosen GoogleSMTP: Mailtrap is down.")
                return {
                    msg: "Selector has chosen GoogleSMTP: Mailtrap is down.",
                    info: await sendWithGoogle(name, email, phone, message, website, recipient)
                }
        } else if ( !(smtpResult.GoogleSMTP) ) {
            // send with googleSMTP when mailtrap is down
                logger.warn ("Selector has chosen mailtrap: GoogleSMTP is down.");
                return {
                    msg: "Selector has chosen mailtrap: GoogleSMTP is down ",
                    info: await sendWithMailtrap(name, email, phone, message, website, recipient)
                }
        } else {
            logger.info ("Selector has chosen mailtrap: Both Mailtrap and GoogleSMTP are online.")
            return {
                    msg: "Selector has chosen mailtrap: Both Mailtrap and GoogleSMTP are online.",
                    info: await sendWithMailtrap(name, email, phone, message, website, recipient)
                }
        }
    } catch (err) {
        throw new Error (`Selector has encountered an error \n${err}`)
    }
}

const serviceSelector2 = async (name, email, phone, message, website, recipient) => {
    try {
        logger.info  ("Selector chose Mailtrap w/Selector 2")
        return {
            msg: "Selector send email with Mailtrap successfully via/Selector 2",
            info: await sendWithMailtrap(name, email, phone, message, website, recipient)
        }
    } catch (err) {
        logger.warn (`Selector encountered an error selectiong mailtrap ${err}\n Sending with googleSMTP instead...`)
        try {
            logger.warn ("Selector chose GoogleSMTP w/Selector 2, Mailtrap failed or is down")
                return {
                msg: "Selector has sent email with gmail successsfully via/Selector 2",
                info: await sendWithGoogle (name, email, phone, message, website, recipient)
            }
        } catch (err) {
            logger.error ("Selector failed to send email\n", err)
            throw new Error ("Failed to send email, both email services likely down")
        }
        
    }
}

export {serviceSelector, serviceSelector2}