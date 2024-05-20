const express = require("express");
const router = express.Router();
const postsController = require("../controller/posts");
const upload = require("../middleware/upload");

router
    .get("/", postsController.getAllPosts)
    .get("/:id", postsController.getDetailPosts)
    .get("/user/:id", postsController.getDetailByUser)
    .post("/", upload, postsController.createPosts)
    .put("/:id", postsController.updatePosts)
    .delete("/:id/:img", postsController.deletePosts);

module.exports = router;
