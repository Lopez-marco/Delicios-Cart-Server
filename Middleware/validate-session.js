let { models } = require('../db');
let jwt = require('jsonwebtoken');

const validateSession = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(500).send({ auth: false, message: 'No token provided.' });
    } else {
        jwt.verify(token, process.env.JWT_KEY, (err, decodedToken) => {
            if (!err && decodedToken) {
                models.user.findOne({
                    where: {
                        id: decodedToken.id
                    }
                })
                    .then(user => {
                        if (!user) throw err;
                        req.user = user;
                        return next();
                    })
                    .catch(err => next(err));
            } else {
                req.errors = err;
                return res.status(500).send('Not authorized');
            }
        });
    }
}

module.exports = validateSession;