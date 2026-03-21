import sendResponse from "../../utils/response.middleware.js"
import { serviceSelector2 } from "../../utils/smtp.selector.js";
import verifySchema from "../email/email.validator.js";


/* Is server alive? */

const isAlive = async (req, res)=> {
    try {
        // await verifySMTP()
        // const msg = await verifyOrigin(req, res)
        const msg = ("Server is alive!!!")
        sendResponse(res, 200, true, msg )
        // if (req.hostname in websites.split(",")) console.log(true); else console.log(typeof req.hostname)
        // TODO: add match case using regex to check if the hostname is in the new websites array (might use string instead of array)
    }catch(error) {
        sendResponse(res, 500, false, "An internal server error occurred, view logs for more details", null, error.message)
        console.error("An error occured checking the server: ", error);
    }
}

const emailRequest = async (req, res) => {
    try {
        // await verifyOrigin(req, res)
        // await verifySMTP().then((result)=> {console.log(result)}) 
        const validationResult = verifySchema(req.body)
        let {name, phone, email, message, website, recipient} = validationResult
        // console.log(`User's name is ${name}, with email: ${email}, and message: ${message} to recipient: ${recipient}`);
        // sendResponse(res, 200, true, validationResult)
        const formatter = () => {
            if (phone === undefined) {
                return `
                <tr>
                    <td width="30%" class="data-row data-label" style="padding: 12px 0; color: #6b7280; font-weight: 500;">Phone</td>
                    <td width="70%" class="data-row data-value" style="padding: 12px 0; color: #9ca3af; font-style: italic;">Not specified</td>
                </tr>
                `
            }
            else if (typeof(phone) === "string") return `
                <tr>
                    <td width="30%" class="data-row data-label" style="padding: 12px 0; color: #6b7280; font-weight: 500;">Phone</td>
                    <td width="70%" class="data-row data-value" style="padding: 12px 0;"><a href="tel:${phone}" style="color: #7c3aed; text-decoration: none; font-weight: 600;">${phone}</a></td>
                </tr>
            `
            else {
                return phone
            }
        }
        const {msg, info} = await serviceSelector2(name, email, formatter(), message, website, recipient)
        sendResponse(res, 200, true, msg, info)
        


    } catch (error) {
        console.error("An error processing a mailing request\n", error)
        sendResponse(res, 500, false, "An internal server error occurred, view logs for more details", null, error.message)
    }
}

export { isAlive, emailRequest }
