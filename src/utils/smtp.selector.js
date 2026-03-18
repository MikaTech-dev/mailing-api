import { sendWithGoogle, sendWithMailtrap } from "../services/email/email.send.js";
import { verifyMailtrap, verifyGoogleSMTP, verifySMTP } from "./smtp.verify.js"


const serviceSelector = async (name, phone, email, message, website, recipient)=> {
    try {
        const smtpResult = await verifySMTP()   // Returns keys: Mailtrap & GoogleSMTP

        if ( !(smtpResult.Mailtrap) ) {    
            // Send with GoogleSMTP when Mailtrap is down
            console.log("Selector has chosen GoogleSMTP: Mailtrap is down.")
                return {
                    msg: "Selector has chosen GoogleSMTP: Mailtrap is down.",
                    info: await sendWithGoogle(name, email, phone, message, website, recipient)
                }
        } else if ( !(smtpResult.GoogleSMTP) ) {
            // send with googleSMTP when mailtrap is down
                console.log("Selector has chosen mailtrap: GoogleSMTP is down.");
                return {
                    msg: "Selector has chosen mailtrap: GoogleSMTP is down ",
                    info: await sendWithMailtrap(name, email, phone, message, website, recipient)
                }
        } else {
            console.log ("Selector has chosen mailtrap: Both Mailtrap and GoogleSMTP are online.")
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
        await verifyMailtrap().catch(async (error) => {
            console.log (`Selector encountered an error selectiong mailtrap \n${err} \nUsing googleSMTP instead...`)
            await verifyGoogleSMTP().catch(error => {throw new Error (error)})
            return {
                msg: "Selector has chosen GoogleSMTP: Mailtrap is down.",
                info: await sendWithGoogle(name, email, phone, message, website, recipient)
            }
        })
        return {
            msg: "Selector chose Mailtrap w/Selector 2",
            info: await sendWithMailtrap(name, email, phone, message, website, recipient)
        }
    } catch (err) {
        console.log ("Selector 2 likely failed to select service \n", err)
        throw new Error ("Selector 2 likely failed to select service \n", err)
    }
}

export {serviceSelector, serviceSelector2}