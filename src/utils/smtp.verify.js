import { logger } from "./logger.config.js";
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
                logger.info("✅ Google SMTP connection successful: ", result);
                
                /* Mailtrap Transport */
                (()=>{
                    mailtrapTransporter.verify()
                    .then(result => {
                        const mailtrapTransportResult = result
                        logger.info("✅ Mailtrap SMTP connection successful: ", mailtrapTransportResult )
                        resolve({ 
                            "Mailtrap": result,
                            "GoogleSMTP": googleTransportResult
                        })
                    })
                })()
            });
        });

        
    } catch (err) {
        logger.error("Failed to verify Either SMTP", err)
        throw new Error("Failed to verify SMTP connection: ", err);
    }
}

const verifyMailtrap = async () => {
    return mailtrapTransporter.verify().then(
        (result) => {
            logger.info("✅ Mailtrap (ONLY) SMTP connection successful: ", result)
        }
    )
}

const verifyGoogleSMTP = async () => {
    return gmailTransporter.verify().then(
        (result) => {
            logger.info ("✅ Google (ONLY)SMTP connection successful", result)
        }
    )
}

export {verifySMTP, verifyMailtrap, verifyGoogleSMTP}