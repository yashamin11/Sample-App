const mongoose = require('mongoose');

let User = new mongoose.Schema({

    username: {
        type: String,
        default:'',
  
    },
    password:{
        type: String,
        required: true,
    }, 
    email:{
        type:String,
        default:''
    },
    address:
    {
        type: String,
        default:''
    },
    confirm_password:
    {
        type: String,
        default:''
    },
    flag:
    {
        type: Number,
        default: 0
    }

});
module.exports = mongoose.model('User', User);