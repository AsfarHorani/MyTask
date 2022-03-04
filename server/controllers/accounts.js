const Income = require("../models/income");
const Expense = require("../models/expense");
const { validationResult } = require('express-validator/check');


exports.addIncome = (req, res, next) => {
    const errors = validationResult(req);
    console.log(errors)
    if (!errors.isEmpty()) {
        const error = new Error('Validation failed.');
        error.statusCode = 422;
        error.data = errors.array();
        throw error;
    }
    const accId = req.params.accId;
    const amount = req.body.amount;
    const incomeType = req.body.incomeType;
    const accountType = req.body.accountType

    const income = new Income({
        type: incomeType,
        amount: amount,
        accountType: accountType,
        accountId: accId
    })

    income.save()
        .then(result => {
            res.status(200).json({
                income: result
            })
        }).catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        })


}

exports.addExpense = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error('Validation failed.');
        error.statusCode = 422;
        error.data = errors.array();
        throw error;
    }
    const accId = req.params.accId;
    const amount = req.body.amount;
    const expenseType = req.body.incomeType;
    const accountType = req.body.accountType

    const expense = new Expense({
        type: expenseType,
        amount: amount,
        accountType: accountType,
        accountId: accId
    })

    expense.save()
        .then(result => {
            res.status(200).json({
                income: result
            })
        }).catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        })
}

exports.getTransactions = (req, res, next) => {
    const accId = req.params.accId;
    let incomes;

    Income.find({ accountId: accId }).then(incs => {
        incomes = incs
        
        return Expense.find({ accountId: accId })

    }).then(expenses => {
      
        console.log(incomes,expenses)
         let trans =  [...expenses, ...incomes ]
       
        return res.status(200).json({
            message: "Get transactions success",
            transactions: trans

        })

    }).catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    })
}