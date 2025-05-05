const express = require('express');
const router = express.Router();
const business = require("../business.js");
const { logRequest } = require("../logger.js");

router.get("/:bookid", async (req, res) => {
    const { bookid } = req.params;
    const { userid } = req.params;

    logRequest({
        endpoint: `/api/v1/checkout/${bookid} [GET]`,
        userId: userid
    });

    const checkedoutBook = await business.getCheckedOutBook(bookid);
    if (!checkedoutBook) {
        return res.status(404).json({ error: "There was an error checking out the book!" });
    }
    return res.json({ message: checkedoutBook });
});

router.get("/all/:userid", async (req, res) => {
    const { userid } = req.params;

    logRequest({
        endpoint: `/api/v1/checkout/all/${userid} [GET]`,
        userId: userid
    });

    const checkedoutBooks = await business.getCheckedOutBooksByUser(userid);
    if (!checkedoutBooks) {
        return res.status(404).json({ error: "There was an error getting all checked out books!" });
    } else if (checkedoutBooks.length === 0) {
        return res.status(404).json({ error: "There are no checked out books!" });
    }
    return res.json({ message: checkedoutBooks });
});

router.post("/:bookid", async (req, res) => {
    const { bookid } = req.params;
    const { userId } = req.body;

    logRequest({
        endpoint: `/api/v1/checkout/${bookid} [POST]`,
        userId: userId || "unknown"
    });

    const checkout = await business.checkoutBook(bookid, userId);
    if (!checkout) {
        return res.status(404).json({ error: "There was an error checking out the book!" });
    }
    return res.json({ message: checkout });
});

router.post("/:bookid/return", async (req, res) => {
    const { bookid } = req.params;
    const { userId } = req.body;

    logRequest({
        endpoint: `/api/v1/checkout/${bookid}/return [POST]`,
        userId: userId || "unknown"
    });

    const returnedBook = await business.checkinBook(bookid, userId);
    if (!returnedBook) {
        return res.status(404).json({ error: "There was an error returning the book!" });
    }
    return res.json({ message: returnedBook });
});

module.exports = router;
