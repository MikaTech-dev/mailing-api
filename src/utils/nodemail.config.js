import nodemailer from "nodemailer"
import { logger } from "./logger.config.js";

const useMailtrapSandbox = process.env.MAILTRAP_USE_SANDBOX

function appEnv () {
    if (process.env.ENV === "development") {
        return false
    }
    return true
}
// Gmail SMPT Transporter Config
const gmailTransporter = nodemailer.createTransport({
    service:"gmail",
    auth: {
        user: process.env.GMAIL_SENDER,
        pass: process.env.APP_PASS
    },
    logger:false,    // Debugger enabled
    pool: true, 
    secure: appEnv()
});

// Check if sandbox mode is enabled
const isSandbox = (tranportValue)=>{
    if (useMailtrapSandbox === "true") {
        logger.info(`❄️  Mailtrap Sandbox in use for property: "${tranportValue}" in transport config ❄️`)
        return true
    }
    else if (useMailtrapSandbox === "false") {
        logger.info (`⚠️ Careful, Mailtrap live in use for property "${tranportValue} ⚠️`)
        return false
    }
    else throw Error (`Unable to determine environment/Invalid sandbox value "${useMailtrapSandbox}", with char length: ${toString(useMailtrapSandbox) }`)
}

const mailtrapHost = ()=> {
    if (isSandbox("host")) {
        return "sandbox.smtp.mailtrap.io"
    }
    return "live.smtp.mailtrap.io"
}

const mailtrapUser = () => {
    if (isSandbox("user")) {
        return "1d0fdcd7fb935b"
    }
    return "api"
}

const mailtrapPass = () => {
    if (isSandbox("pass")) {
        return "ea042d73f32bd0"
    }
    return process.env.MAILTRAP_TOKEN
}


// Mailtrap SMPT Transporter Config
const mailtrapTransporter = nodemailer.createTransport({
    host: mailtrapHost(),
    port: 587,
    auth: {
        user: mailtrapUser(),
        pass: mailtrapPass(),
    },
    logger:true,
    pool: true
});


export { gmailTransporter, mailtrapTransporter }