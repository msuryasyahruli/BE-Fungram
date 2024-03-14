const {
    selectByPost,
    insertComment,
    deleteComment,
    findPostId,
    findId,
} = require("../model/comments");
const commonHelper = require("../helper/common");

const commentsController = {
    getByPosts: async (req, res) => {
        const post_id = String(req.params.id);
        const { rowCount } = await findPostId(post_id);
        if (!rowCount) {
            return res.json({ message: "ID Not Found" });
        }
        selectByPost(post_id)
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

    createComments: async (req, res) => {
        const { comment_text, post_id, user_nickname } = req.body;
        const comment_id = "comment-" + Math.floor(Math.random() * 10 * Math.pow(10, 9));
        const data = {
            comment_id,
            comment_text,
            post_id,
            user_nickname,
        };
        insertComment(data)
            .then((result) =>
                commonHelper.response(res, result.rows, 201, "Comment created")
            )
            .catch((err) => res.send(err));
    },

    deleteComments: async (req, res) => {
        try {
            const comment_id = String(req.params.id);
            const { rowCount } = await findId(comment_id);
            if (!rowCount) {
                res.json({ message: "ID is Not Found" });
            }
            deleteComment(comment_id)
                .then((result) =>
                    commonHelper.response(res, result.rows, 200, "Example deleted")
                )
                .catch((err) => res.send(err));
        } catch (error) {
            console.log(error);
        }
    },
}

module.exports = commentsController;