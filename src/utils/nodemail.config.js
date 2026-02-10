import nodemailer from "nodemailer"
import {MailtrapTransport} from "mailtrap"

function appEnv () {
    if (process.env.ENV === "development") {
        return false
    }
    return true
}

const gmailTransporter = nodemailer.createTransport({
    service:"gmail",
    auth: {
        user: process.env.GMAIL_SENDER,
        pass: process.env.APP_PASS
    },
    logger:true,    // Debugger enabled
    pool: true, 
    secure: appEnv
});
// try {
//     await gmailtransporter.verify()
//     console.log("Server ready to recieve messages!")
// } catch (error){
//     console.log("An error occurred: ", error);
// }

export default gmailTransporter