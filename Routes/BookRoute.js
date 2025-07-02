const express = require("express");
const router = express.Router();
const auth=require("../Middleware/middleware")
const bookController = require("../Controller/BookController");
router.post("/add",auth, bookController.createBook);
router.get("/getall", bookController.getAllBooks);
router.get("/single/:id", bookController.getSingleBook);
router.put("/update/:id",auth,bookController.updateBook)
router.delete("/delete/:id",auth,bookController.deleteBook);


module.exports = router;
