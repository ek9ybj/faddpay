module.exports = {
    isAuthenticated: function isAuthenticated(status) {
        return function (req, res, next) {
            if(status) {
                if (req.session.user) {
                    next();
                } else {
                    res.redirect('/user/login');
                }
            } else {
                if (!req.session.user) {
                    next();
                } else {
                    res.redirect('/');
                }
            }
        };
    }
}