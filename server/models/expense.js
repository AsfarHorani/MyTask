const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const expenseSchema = new Schema({
    accountId: {
        type: Schema.Types.ObjectId,
        ref: 'Account',
        require: true
    },
    expenseType: {
        type: String,
        require: true
    },
    time: {
        type: Date,
        timestamps: true,
        require: true
    },
    amount: {
        type: Number,
        default: 0,
        require: true
    },
    type: {
        type: String,
        required: true
    },
    accountType: {
        type: String,
        required: true
    }


})

module.exports = mongoose.model('Expense', expenseSchema)