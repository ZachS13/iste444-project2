const express = require('express');
const router = express.Router();
const business = require("../business.js");

router.get("/:bookid", async (req, res) => {
    const { bookid } = req.params;
    const checkedoutBook = await business.getCheckedOutBook(bookid);
    if (!checkedoutBook) {
        return res
            .status(404)
            .json({ error: "There was an error checking out the book!" });
    }
    return res.json({ message: checkedoutBook });
});

router.post("/:bookid", async (req, res) => {
    const { bookid } = req.params;
    const { userId } = req.body;
    const checkout = await business.checkoutBook(bookid, userId);
    if (!checkout) {
        return res
            .status(404)
            .json({ error: "There was an error checking out the book!" });
    }
    return res.json({ message: checkout });
});

router.post("/:bookid/return", async (req, res) => {
    const { bookid } = req.params;
    const { userId } = req.body;
    const returnedBook = await business.checkinBook(bookid, userId);
    if (!returnedBook) {
        return res
            .status(404)
            .json({ error: "There was an error returning the book!" });
    }
    return res.json({ message: returnedBook });
});

module.exports = router;