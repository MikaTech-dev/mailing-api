import { rateLimit } from "express-rate-limit"

const limiter = rateLimit({
    windowMs: 10 * 60 * 1000,
    limit: parseInt(process.env.RATELIMIT),
    standardHeaders: true,
    legacyHeaders: false,
})

export default limiter