const express = require("express");
const router = express.Router();
const exampleRouter = require("./example");
const usersRouter = require("./users");
const postsRouter = require("./posts")

router.use("/example", exampleRouter);
router.use("/users", usersRouter);
router.use("/post", postsRouter);

module.exports = router;
