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
    },
    isAdmin: function isAdmin(level){
        return function (req, res, next){
            if(req.session.user && req.session.user.admin >= level){
                next();
            }else{
                res.render('404');
            }
        }
    }
}