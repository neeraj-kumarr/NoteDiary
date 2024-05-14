var jwt = require('jsonwebtoken');

const fetchuser = (req, res, next) => {
    // Getting the user from JWT token and adding id to req object;
    const token = req.header('auth-token');
    if (!token) {
        return res.status(401).send({ error: "Please authenticate using a valid token" });
    }

    try {
        const data = jwt.verify(token, 'shhhhh');
        req.user = data.user;
        // console.log(data)
        next();
    } catch (error) {
        res.status(401).send({ error: "Please authenticate using a valid token" });
    }
};

module.exports = fetchuser;