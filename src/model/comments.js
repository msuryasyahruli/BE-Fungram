const Pool = require("../config/db");

const selectByPost = (post_id) => {
    return Pool.query(
        `SELECT * FROM comments WHERE post_id='${post_id}' ORDER BY time DESC`
    );
};

const insertComment = (data) => {
    const { comment_id, comment_text, post_id, user_nickname } = data;
    return Pool.query(
        `INSERT INTO comments(comment_id,comment_text,post_id,user_nickname) VALUES('${comment_id}','${comment_text}','${post_id}','${user_nickname}')`
    );
};

const deleteComment = (comment_id) => {
    return Pool.query(`DELETE FROM comments WHERE comment_id='${comment_id}'`);
};


const findPostId = (post_id) => {
    return new Promise((resolve, reject) =>
        Pool.query(`SELECT post_id FROM comments WHERE post_id='${post_id}'`, (error, result) => {
            if (!error) {
                resolve(result);
            } else {
                reject(error);
            }
        })
    );
};

const findId = (comment_id) => {
    return new Promise((resolve, reject) =>
        Pool.query(`SELECT comment_id FROM comments WHERE comment_id='${comment_id}'`, (error, result) => {
            if (!error) {
                resolve(result);
            } else {
                reject(error);
            }
        })
    );
};

module.exports = {
    selectByPost,
    insertComment,
    deleteComment,
    findPostId,
    findId,
};
