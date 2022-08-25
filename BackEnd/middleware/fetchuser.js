var jwt = require('jsonwebtoken');
const jwt_secret_string = 'this string is secret';

const fetchuser = (req, res, next) => {
    // get the user from jwt token and add id  to req obj

    const token = req.header('auth-token');
    if (!token) {
        res.status(401).send({ error: "please authenticate using a valid token" })
    }
    try {
        const data = jwt.verify(token, jwt_secret_string);
        req.user = data.user;
        next();
    } catch (error) {
        res.status(401).send({ error: "Internal error" })
    }

}

module.exports = fetchuser;