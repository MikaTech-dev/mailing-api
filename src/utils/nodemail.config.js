import nodemailer from "nodemailer"

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
    secure: appEnv
});

// Check if sandbox is enabled
const isSandbox = (tranportValue)=>{
    if (process.env.MAILTRAP_USE_SANDBOX === "true") {
        console.log(`Mailtrap Sandbox in use for property: "${tranportValue}" in transport config ✅`)
        return true
    }
    else if (process.env.MAILTRAP_USE_SANDBOX === "false") {
        console.log(`⚠️ Careful, Mailtrap live in use for property "${tranportValue} ⚠️`)
        return false
    }
    else throw Error (`Unabled to determine environment/Invalid sandbox value "${process.env.MAILTRAP_USE_SANDBOX}", with char length: ${process.env.MAILTRAP_USE_SANDBOX.length}`)
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
    port: 2525,
    auth: {
        user: mailtrapUser(),
        pass: mailtrapPass(),
    },
    logger:true
});


export { gmailTransporter, mailtrapTransporter }