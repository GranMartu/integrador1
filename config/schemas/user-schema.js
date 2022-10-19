const mongoose = require("mongoose");
const { Schema, model } = require("mongoose")
const memberschema = new Schema({
    name: { type: String, required: true },
    bearname: { type: String, required: true, unique: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
},
    { timestamps: true }
);

const Member = model("Member", memberschema)
module.exports = Member;