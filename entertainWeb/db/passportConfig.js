// passport.js

// load all the things we need
var LocalStrategy = require('passport-local').Strategy;
var crypto = require('crypto')
var mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'entertainAdmin',
    password: 'SomeTestPassword'
});

connection.query('USE entertain');


var secret = 'This is the secret' //used to hash password for safe storage.


// expose this function to our app using module.exports
module.exports = function (passport) {

    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function (id, done) {
        connection.query("select * from users where id = " + id, function (err, rows) {
            done(err, rows[0]);
        });
    });


    // =========================================================================
    // LOCAL SIGNUP ============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

    passport.use('local-register', new LocalStrategy({
            // by default, local strategy uses username and password, we will override with email
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true // allows us to pass back the entire request to the callback
        },
        function (req, email, password, done) {

            // find a user whose email is the same as the forms email
            // we are checking to see if the user trying to login already exists
            connection.query("select * from users where email = '" + email + "'", function (err, rows) {
                if (err)
                    return done(err);
                if (rows.length) {
                    return done(null, false, {'message': 'User already exists'});
                } else {
                    // if there is no user with that email
                    // create the user
                    var newUserMysql = new Object();
                    var passToCrypto = crypto.createHmac('sha256', secret).update(password).digest('hex');
                    newUserMysql.email = email;
                    newUserMysql.password = passToCrypto;

                    var insertQuery = "INSERT INTO users ( email, password ) values ('" + email + "','" + passToCrypto + "')";
                    connection.query(insertQuery, function (err, rows) {
                        newUserMysql.id = rows.insertId;

                        return done(null, newUserMysql);
                    });
                }
            });
        }));

    // =========================================================================
    // LOCAL LOGIN =============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

    passport.use('local-login', new LocalStrategy({
            // by default, local strategy uses username and password, we will override with email
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true // allows us to pass back the entire request to the callback
        },
        function (req, email, password, done) { // callback with email and password from our form

            connection.query("SELECT * FROM `users` WHERE `email` = '" + email + "'", function (err, rows) {
                if (err)
                    return done(err);
                if (!rows.length) {
                    return done(null, false, {'message': 'No user found'}); // req.flash is the way to set flashdata using connect-flash
                }

                var passToCrypto = crypto.createHmac('sha256', secret).update(password).digest('hex');
                // if the user is found but the password is wrong
                if (!(rows[0].password == passToCrypto))
                    return done(null, false, {'message': 'Oops! wrong password'}); // create the loginMessage and save it to session as flashdata

                // all is well, return successful user
                return done(null, rows[0]);

            });


        }));
};