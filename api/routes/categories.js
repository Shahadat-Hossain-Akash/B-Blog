const router = require('express').Router();
const Category = require('../models/Category');

router.post("/", async (req, res) => {

    const newCat = new Category(req.body);

    try {
        const savedCat = await newCat.save();
        res
            .status(200)
            .json(savedCat)
    } catch (err) {
        res
            .status(500)
            .json(err)
    }

});

router.get("/", async (req, res) => {

    try {
        const cats = await Category.find();
        res
            .status(200)
            .json(cats)
    } catch (err) {
        res
            .status(500)
            .json(err)
    }

});

router.delete("/:id", async (req, res) => {
    try {
        const cat = await Category.findById(req.params.id);
        try {
            await Category.findByIdAndDelete(req.params.id, cat);
            res
                .status(200)
                .json("Successfully deleted");
        } catch (err) {
            res
                .status(500)
                .json(err);
        }
    } catch (err) {
        res
            .status(401)
            .json("category not found")
    }
});

module.exports = router