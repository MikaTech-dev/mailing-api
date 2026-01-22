const sendResponse = require ("../utils/responseMiddleware")

/* Is server alive? */
module.exports = async (req, res)=> {
    sendResponse(res, 201, true, "Server is alive")
    console.log(req.ip, "Server is alive");
}