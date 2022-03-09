const express = require('express');
const router = express.Router();
const userRoutes = require('../controllers/user');
const isAuth = require('../auth-middleware/auth')
const { body } = require('express-validator');
const { check } = require("express-validator/check");
const User = require('../models/user')
const accountRoutes = require("../controllers/accounts");

//sign up route
router.post('/signup', [
    body('password', 'Password has to be valid.')
        .exists()
        .withMessage('Password is Requiered')
        .isLength({ min: 5 })
        .trim(),
        body('email', "email has to be valid").isEmail()
        .withMessage('Please enter a valid email address.')
        .normalizeEmail().custom(value => {
            return User.findOne({ email: value }).then(user => {
                if (user) {
                    console.log(user)
                    return Promise.reject('Email already in use');
                }
            })
        }),




    body('username').isLength({ min: 3 }).trim()
], userRoutes.signup);

//login route
router.post('/login', [body('email')
    .exists()
    .withMessage('email is Requiered')
    .isEmail()
    .withMessage('Please enter a valid email address.')
    .normalizeEmail(),
body('password', 'Password has to be valid.')
    .exists()
    .withMessage('Password is Requiered')
    .isLength({ min: 5 })
    .isAlphanumeric()
    .trim()
], userRoutes.login);

//add-income route
router.post('/add-income/:accId', accountRoutes.addIncome, [
    body("amount")
        .exists()
        .withMessage('Amount is Requiered')
        .isFloat(),
    body("accountType")
        .exists()
        .withMessage('account type is Requiered')
        .isString()
        .withMessage(' must be a String')
        .isIn(['bank', 'cash'])
        .withMessage("Wrong account type must be either cash or bank")

]);
//add-expense route
router.post('/add-expense/:accId', accountRoutes.addExpense, [
    body("amount")
        .exists()
        .withMessage('Amount is Requiered')
        .isFloat(),
    body("accountType")
        .exists()
        .withMessage('account type is Requiered')
        .isString()
        .withMessage(' must be a String')
        .isIn(['bank', 'cash'])
        .withMessage("Wrong account type must be either cash or bank")

]
);
//get all transactions route
router.get('/get-transactions/:accId',isAuth, accountRoutes.getTransactions)

module.exports = router;