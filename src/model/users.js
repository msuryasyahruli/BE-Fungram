const Pool = require("../config/db");

const createUser = (data) => {
  const { user_id, user_email, passwordHash, user_fullname, user_nickname } =
    data;
  return Pool.query(
    `INSERT INTO users(user_id,user_email,user_password,user_fullname,user_nickname) VALUES('${user_id}','${user_email}','${passwordHash}','${user_fullname}','${user_nickname}')`
  );
};

const updateUser = (data) => {
  const { user_id, user_email, user_fullname, user_nickname, user_bio } = data;
  return Pool.query(
    `UPDATE users SET user_email='${user_email}', user_fullname='${user_fullname}', user_nickname='${user_nickname}', user_bio='${user_bio}' WHERE user_id='${user_id}'`
  );
};

const findEmail = (user_email) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT * FROM users WHERE user_email='${user_email}'`,
      (error, result) => {
        if (!error) {
          resolve(result);
        } else {
          reject(error);
        }
      }
    )
  );
};

const findId = (user_id) => {
  return new Promise((resolve, reject) =>
    Pool.query(`SELECT user_id FROM users WHERE user_id='${user_id}'`, (error, result) => {
      if (!error) {
        resolve(result);
      } else {
        reject(error);
      }
    })
  );
};


module.exports = {
  createUser,
  updateUser,
  findEmail,
  findId,
};
