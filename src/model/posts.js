const Pool = require("../config/db");

const selectAllPosts = (limit, offset, sortby, sort) => {
    return Pool.query(
        `SELECT user_nickname, verify, posts.* FROM users INNER JOIN posts ON posts.user_id = users.user_id ORDER BY ${sortby} ${sort} LIMIT ${limit} OFFSET ${offset}`
    );
};

const selectPost = (post_id) => {
    return Pool.query(`SELECT user_nickname, posts.* FROM users INNER JOIN posts ON posts.user_id = users.user_id WHERE post_id='${post_id}'`);
};

const selectByUser = (user_id) => {
    return Pool.query(`SELECT * FROM posts WHERE user_id='${user_id}' ORDER BY time DESC`);
};

const insertPost = (data) => {
    const { post_id, user_id, post_image, post_captions } = data;
    return Pool.query(
        `INSERT INTO posts(post_id,user_id,post_image,post_captions) VALUES('${post_id}','${user_id}','${post_image}','${post_captions}')`
    );
};

const updatePost = (data) => {
    const { post_id, post_captions } = data;
    return Pool.query(
        `UPDATE posts SET post_captions='${post_captions}' WHERE post_id='${post_id}'`
    );
};

const deletePost = (post_id) => {
    return Pool.query(`DELETE FROM posts WHERE post_id='${post_id}'`);
};

const countData = () => {
    return Pool.query("SELECT COUNT(*) FROM posts");
};

const findId = (post_id) => {
    return new Promise((resolve, reject) =>
        Pool.query(`SELECT post_id FROM posts WHERE post_id='${post_id}'`, (error, result) => {
            if (!error) {
                resolve(result);
            } else {
                reject(error);
            }
        })
    );
};

module.exports = {
    selectAllPosts,
    selectPost,
    selectByUser,
    insertPost,
    updatePost,
    deletePost,
    countData,
    findId,
};
