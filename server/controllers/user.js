const bcrypt = require('bcrypt');
const User = require('../models/user');
const jwt = require('jsonwebtoken')
const { validationResult } = require('express-validator/check');
const Account = require("../models/account");


exports.signup = (req, res, next) => {
    console.log(req.body)
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors)
        const error = new Error('Validation failed.');
        error.statusCode = 422;
        error.data = errors.array();
        throw error;
    }

    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;
    let loadedUser;
    bcrypt.hash(password, 12)
        .then(hashedPassword => {
            const user = new User({
                username: username,
                email: email,
                password: hashedPassword,
            })
            return user.save()
        }).then(u => {

            loadedUser = u;
            const account = new Account({
                userId: u._id
            })

            return account.save()

        }).then(result => {
            console.log(result)
            res.status(200).json({
                message: 'Sign up successful',
                user: loadedUser,
                account: result

            })
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        })


}


exports.login = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error('Validation failed.');
        error.statusCode = 422;
        error.data = errors.array();
        throw error;
    }
    console.log(req.body.email, req.body.password)
    const email = req.body.email;
    const password = req.body.password;
    let loadedUser;
    let token;
    console.log(email, password)
    User.findOne({ email: email })
        .then(user => {

            if (!user) {
                console.log("user doesnt exist")
                const error = new Error("User doesn't exist");
                error.statusCode = 401;
                throw error;
            }

            loadedUser = user;

            return bcrypt.compare(password, user.password)
        })
        .then(doMatch => {
            if (!doMatch) {
                console.log('incorrect password')
                const error = new Error("Password is incorrect");
                error.statusCode = 403;
                throw error;
            }
            console.log(loadedUser)
            token = jwt.sign({
                email: loadedUser.email,
                userId: loadedUser._id.toString()
            }, 'myusersignature', { expiresIn: '2h' })

            return Account.find({ userId: loadedUser._id })


        }).then(accData => {
            console.log("accDATA",accData)


            return res.status(200).json({
                token: token,
                userId: loadedUser._id,
                accountId: accData[0]._id,
                message: "Login succesfull"
            })
        })

        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }


            next(err);
        })


}
