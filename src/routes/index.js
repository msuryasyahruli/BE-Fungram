const express = require("express");
const router = express.Router();
const exampleRouter = require("./example");
const usersRouter = require("./users");

router.use("/example", exampleRouter);
router.use("/users", usersRouter);

module.exports = router;
