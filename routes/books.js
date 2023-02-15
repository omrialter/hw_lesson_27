const express = require("express");
const { BookModel, validateJoi } = require("../models/bookModel");
const router = express.Router();

//GET
router.get("/", async (req, res) => {
    let perPage = 4;
    let page = req.query.page - 1 || 0;
    let sort = req.query.sort || "_id";
    let reverse = (req.query.reverse == "yes") ? 1 : -1;
    try {
        let data = await BookModel
            .find({})
            .limit(perPage)
            .skip(page * perPage)
            .sort({ [sort]: reverse })
        res.json(data);
    }
    catch (err) {
        console.log(err);
        res.status(502).json({ err })
    }
})
//POST
router.post("/", async (req, res) => {
    let validBody = validateJoi(req.body);
    if (validBody.error) {
        return res.status(400).json(validBody.error.details)
    }
    try {
        let book = new BookModel(req.body);
        await book.save();
        res.status(201).json(book);
    }
    catch (err) {
        console.log(err);
        res.status(502).json({ err })
    }
})
//PUT
router.put("/:id", async (req, res) => {
    let validBody = validateJoi(req.body);

    if (validBody.error) {
        return res.status(400).json(validBody.error.details)
    }
    try {
        let id = req.params.id;
        let data = await BookModel.updateOne({ _id: id }, req.body);
        res.json(data);
    }
    catch (err) {
        console.log(err);
        res.status(502).json({ err })
    }
})
//DELETE
router.delete("/:id", async (req, res) => {
    try {
        let id = req.params.id;
        let data = await BookModel.deleteOne({ _id: id });
        res.json(data);
    }
    catch (err) {
        console.log(err);
        res.status(502).json({ err })
    }
})








module.exports = router;