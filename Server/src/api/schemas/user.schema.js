const mongoose = require("mongoose");
const validator = require("mongoose-validator");

const userSchema = new mongoose.Schema
    ({
        _id: String,
        firstName:
        {
            type: String,
            required: true,
        },
        lastName:
        {
            type: String,
            required: true,
        },
        email:
        {
            type: String,
            lowercase: true,
            trim: true,
            validate: [
                validator({
                    validator: 'isEmail',
                    message: 'Oops..please enter valid email'
                })
            ],
            default: null,
            unique:true
        },
        password:
        {
            type: String,
            minlength: 1,
            trim: true,
            required: true
        },
        role:
        {
            type: String,
            trim: true,
            default: 'view'
        },
        isActive:
        {
            type: Boolean,
            default: true
        }
    })

module.exports=mongoose.model("User",userSchema);
