import rateLimit from "../config/upstash.js";


const rateLimiter = async (req, res, next) => {
    try {
        const { success } = await rateLimit.limit("my-ratelimit-key");

        if (!success) {
            return res.status(429).json({ message: "Too many requests please wait!" });
        }

        next();
    } catch (error) {
        console.log("Error in rate limit: ", error)
        next(error);
    }
}

export default rateLimiter;