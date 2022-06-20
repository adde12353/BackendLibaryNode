const express = require("express");


const booksController = require('../controllers/books.controller')
const booksRouter = express.Router();


/* Get */
booksRouter.get("/", booksController.getAll)
booksRouter.get("/:id", booksController.getOne)

/* POST */
booksRouter.post("/", booksController.post)

/* PUT */
booksRouter.put("/:id", booksController.put)

/* PATCH */
booksRouter.patch("/:id", booksController.patch)

/* DELETE */
booksRouter.delete("/", booksController.deleteAll)
booksRouter.delete("/:id", booksController.deleteOne)


module.exports = booksRouter;