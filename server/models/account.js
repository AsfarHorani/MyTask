const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const accountSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        require: true
    },

  
 
})

module.exports = mongoose.model('Account', accountSchema)