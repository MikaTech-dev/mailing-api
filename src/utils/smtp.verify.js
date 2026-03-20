import { gmailTransporter } from "./nodemail.config.js";
// import sendResponse from "../../utils/response.middleware.js";
import { mailtrapTransporter } from "./nodemail.config.js";

// Verify Google SMTP connection
const verifySMTP = () => {
    try {
        return new Promise((resolve, reject) =>{
            /* Google transport */
            gmailTransporter.verify()
            .then(result =>{
                const googleTransportResult = result
                console.log("✅ Google SMTP connection successful: ", result);
                
                /* Mailtrap Transport */
                (()=>{
                    mailtrapTransporter.verify()
                    .then(result => {
                        const mailtrapTransportResult = result
                        console.log("✅ Mailtrap SMTP connection successful: ", mailtrapTransportResult )
                        resolve({ 
                            "Mailtrap": result,
                            "GoogleSMTP": googleTransportResult
                        })
                    })
                })()
            });
        });

        
    } catch (err) {
        console.error("Failed to verify Either SMTP", err)
        throw new Error("Failed to verify SMTP connection: ", err);
    }
}

const verifyMailtrap = async () => {
    return mailtrapTransporter.verify().then(
        (result) => {
            console.log("✅ Mailtrap (ONLY) SMTP connection successful: ", result)
        }
    )
}

const verifyGoogleSMTP = async () => {
    return gmailTransporter.verify().then(
        (result) => {
            console.log("✅ Google (ONLY)SMTP connection successful", result)
        }
    )
}

export {verifySMTP, verifyMailtrap, verifyGoogleSMTP}