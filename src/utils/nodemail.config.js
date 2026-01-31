import nodemailer from "nodemailer"

function appEnv () {
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
    logger:true,    // Debugger enabled
    pool: true, 
    secure: appEnv
});
// try {
//     await transporter.verify()
//     console.log("Server ready to recieve messages!")
// } catch (error){
//     console.log("An error occurred: ", error);
// }

export default transporter