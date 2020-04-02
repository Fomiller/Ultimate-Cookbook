

module.exports = function(app){
    // login in page
    app.get('/', function(req, res){
        res.render('index');
    });

    // signup page
    app.get('/signup', function(req, res) {
        res.render('signup');
    });

    // members page, served after successful login
    app.get('/members', function(req, res) {
        res.render('members');
    });

};

