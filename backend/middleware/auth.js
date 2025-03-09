const jwt = require('jsonwebtoken');


const authenticate = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ success: false, message: "Unauthorized: No token provided" });
        }
        // console.log("helloooooo")
        const token = authHeader.split(" ")[1];
        // console.log(token)
        const decoded = jwt.verify(token, process.env.ACCESS_SECRET);

        // console.log(decoded)
        req.user = decoded;
        
        next();
    } catch (err) {
        return res.status(401).json({ success: false, message: "Invalid or expired token" });
    }
};

const authorization = () => {

}

module.exports = authenticate;
