const mongoose = require("mongoose");
const Joi = require("joi");


let schema = new mongoose.Schema({
    name: String,
    cat_url: String,
    info: String,
    img_url: String,
    date_created: {
        type: Date, default: Date.now
    },
})
exports.BookModel = mongoose.model("books", schema)

exports.validateJoi = (_reqBody) => {
    let joiSchema = Joi.object({
        name: Joi.string().min(2).max(150).required(),
        cat_url: Joi.string().min(2).max(999).required(),
        info: Joi.string().min(2).max(999).required(),
        img_url: Joi.string().min(2).max(500).allow(null, ""),
    })
    return joiSchema.validate(_reqBody)
}