const express = require("express");
const router = express.Router();
const commentsController = require("../controller/comments");

router
  .get("/:id", commentsController.getByPosts)
  .post("/", commentsController.createComments)
  .delete("/:id", commentsController.deleteComments)

module.exports = router;