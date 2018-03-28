var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');

var app = express();

// view engine setup
app.set('view engine', 'html');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'app')));

app.use('/', indexRouter);
app.use('/api/v1/users', indexRouter);


const BodyParser = require('body-parser');
const CookieParser = require('cookie-parser');
var session = require("express-session");
const passport = require('passport');
const passportConfig = require('./db/passportConfig');

passportConfig(passport);

app.use(BodyParser.json());
app.use(CookieParser());
app.use(BodyParser.urlencoded({extended: true}));

app.use(session({
    secret: "This is the secret",
    saveUninitialized: false,
    resave: false
}));

app.use(passport.initialize());
app.use(passport.session())


var signUp = (function (req, res) {
    if (req.user.error) {
        res.status = 400
        res.json = {'error': req.user.error}
        req.user = null
        return res
    }
    else {
        res.redirect('/home')
    }

})


// app.post('/api/register', passport.authenticate('local-register'), signUp);

app.post('/api/register', function (req, res, next) {
    passport.authenticate('local-register', function (err, user, info) {
        console.log(err, user, info)
        if (err) {
            return res.status(500).send({error: err});
        }
        if (user === false) {
            res.status(400).send({error: info.message});
        } else {
            res.status(200).send();
        }
    })(req, res, next);
});

app.post('/api/login', function (req, res, next) {
    passport.authenticate('local-register', function (err, user, info) {
        console.log(err, user, info)
        if (err) {
            return res.status(500).send({error: err});
        }
        if (user === false) {
            res.status(400).send({error: info.message});
        } else {
            res.status(200).send();
        }
    })(req, res, next);
});

app.get('/api/logout', (req, res) => {
    req.logout();
    res.status(200).send();
});

app.all("/*", function (req, res, next) {
    res.sendFile("index.html", {root: __dirname + "/app"});
});


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;


