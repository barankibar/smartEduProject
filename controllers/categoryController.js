const asyncHandler = require("express-async-handler");

const Category = require("../models/CategoryModel");

const createCategory = asyncHandler( async (req, res) => {
    try{
        const category = await Category.create(req.body);

        res.status(200).json({
            status: "success",
            category
        });
    }catch(err) {
        res.status(400).json({
            status: "fail",
            err
        });
    }
});

module.exports = createCategory;