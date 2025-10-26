const mongoose = require('mongoose')
const { string } = require('zod')
const dotenv = require('dotenv')
dotenv.config();

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB successfully"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));


const userschema = mongoose.Schema({
    username: { type: String, required: true, unique: true }, // required ensures no null
    password: { type: String, required: true },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true }
})

const accountschema = mongoose.Schema({
    userId:{
        type: mongoose.Schema.ObjectId,
        ref : 'User',
        required: true
    },
    balance:{
        type : Number,
        required : true
    }
})

const Account = mongoose.model('Account' , accountschema)
const User = mongoose.model("User" , userschema)

module.exports = {
    User,
    Account
}