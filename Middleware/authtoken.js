const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    //console.log(req.session.user);
    const token = req.session.user && req.session.user.token;
    //const token = req.header('Authorization');
    //console.log(token);
    if (!token) {
         console.log('Unauthorized');
           res.redirect('/login');
    }
    //console.log(token);
    jwt.verify(token, '110901', (err, user) => {
        if (err) {
             console.log('Không xác thực người dùng');
              res.redirect('/login');
        }
        req.user = user;
        //console.log(user);
        next();
    });
};

module.exports = authenticateToken;
