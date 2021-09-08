const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: Number,
        default: 0
    },
    cart: {
        type: Array,
        default: []
    },
    avatar:{
        type: String,
        default: "https://res.cloudinary.com/dcs4mclcj/image/upload/v1621974250/avatar/user_qk5hjm.png"

    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Users', userSchema)