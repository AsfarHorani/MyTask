const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const incomeSchema = new Schema({

    accountId: {
        type: Schema.Types.ObjectId,
        ref: 'Account',
        require: true
    },

    incomeType: {
        type: String,
        require: true

    },
    time: {
        type: Date,
        timestamps: true,

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

module.exports = mongoose.model('Income', incomeSchema)