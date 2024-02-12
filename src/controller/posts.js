const {
    selectAllPosts,
    selectPost,
    selectByUser,
    insertPost,
    updatePost,
    deletePost,
    countData,
    findId,
} = require("../model/posts");
const commonHelper = require("../helper/common");
const { v4: uuidv4 } = require("uuid");
const cloudinary = require("../middleware/cloudinary");

const postsController = {
    getAllPosts: async (req, res) => {
        try {
            const page = Number(req.query.page) || 1;
            const limit = Number(req.query.limit) || 10;
            const offset = (page - 1) * limit;
            const sortby = req.query.sortby || "time";
            const sort = req.query.sort || "DESC";
            const result = await selectAllPosts(limit, offset, sortby, sort);
            const {
                rows: [count],
            } = await countData();
            const totalData = parseInt(count.count);
            const totalPage = Math.ceil(totalData / limit);
            const pagination = {
                currentPage: page,
                limit: limit,
                totalData: totalData,
                totalPage: totalPage,
            };
            commonHelper.response(
                res,
                result.rows,
                200,
                "get data success",
                pagination
            );
        } catch (error) {
            console.log(error);
        }
    },

    getDetailPosts: async (req, res) => {
        const post_id = String(req.params.id);
        const { rowCount } = await findId(post_id);
        if (!rowCount) {
            return res.json({ message: "ID Not Found" });
        }
        selectPost(post_id)
            .then((result) => {
                commonHelper.response(
                    res,
                    result.rows,
                    200,
                    "get data success from database"
                );
            })
            .catch((err) => res.send(err));
    },

    getDetailByUser: async (req, res) => {
        const user_id = String(req.params.id);
        // const { rowCount } = await findId(user_id);
        // if (!rowCount) {
        //     return res.json({ message: "ID Not Found" });
        // }
        selectByUser(user_id)
            .then((result) => {
                commonHelper.response(
                    res,
                    result.rows,
                    200,
                    "get data success from database"
                );
            })
            .catch((err) => res.send(err));
    },

    createPosts: async (req, res) => {
        const result = await cloudinary.uploader.upload(req.file.path);
        const post_image = result.secure_url;
        const { user_id, post_captions } = req.body;
        const post_id = uuidv4();
        const data = {
            post_id,
            user_id,
            post_image,
            post_captions,
        };
        insertPost(data)
            .then((result) =>
                commonHelper.response(res, result.rows, 201, "Posts created")
            )
            .catch((err) => res.send(err));
    },

    updatePosts: async (req, res) => {
        try {
            const post_id = String(req.params.id);
            const { post_captions } = req.body;
            const { rowCount } = await findId(post_id);
            if (!rowCount) {
                res.json({ message: "ID is Not Found" });
            }
            const data = {
                post_id,
                post_captions,
            };
            updatePost(data)
                .then((result) =>
                    commonHelper.response(res, result.rows, 200, "Posts updated")
                )
                .catch((err) => res.send(err));
        } catch (error) {
            console.log(error);
        }
    },

    deletePosts: async (req, res) => {
        try {
            const post_id = String(req.params.id);
            const { rowCount } = await findId(post_id);
            if (!rowCount) {
                res.json({ message: "ID is Not Found" });
            }
            deletePost(post_id)
                .then((result) =>
                    commonHelper.response(res, result.rows, 200, "Posts deleted")
                )
                .catch((err) => res.send(err));
        } catch (error) {
            console.log(error);
        }
    },
};

module.exports = postsController;