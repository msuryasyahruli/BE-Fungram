const express = require("express");
const router = express.Router();
const usersRouter = require("./users");
const postsRouter = require("./posts")
const commentsRouter = require("./comments")

router.use("/users", usersRouter);
router.use("/post", postsRouter);
router.use("/comment", commentsRouter);

module.exports = router;
