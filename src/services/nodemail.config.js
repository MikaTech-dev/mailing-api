import nodemailer from "nodemailer"

function devEnv () {
    if (process.env.ENV === "development") {
        return false
    }
    return true
}

const transporter = nodemailer.createTransport({
    service:"gmail",
    auth: {
        user: process.env.SENDER,
        pass: process.env.APP_PASS
    },
    logger:true,
    pool: true, 
    secure: devEnv
});

export default transporter