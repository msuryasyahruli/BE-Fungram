const { createUser, findEmail, updateUser, findId } = require("../model/users");
const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");
const authHelper = require("../helper/auth");
const commonHelper = require("../helper/common");

const usersController = {
  registerUser: async (req, res) => {
    try {
      const { user_email, user_fullname, user_nickname, user_password } =
        req.body;
      const { rowCount } = await findEmail(user_email);
      if (rowCount) {
        return res.json({ messege: "Email is already taken" });
      }
      const passwordHash = bcrypt.hashSync(user_password);
      const user_id = uuidv4();
      const data = {
        user_id,
        user_email,
        user_fullname,
        user_nickname,
        passwordHash,
      };
      createUser(data)
        .then((result) => {
          commonHelper.response(res, result.rows, 201, "User created");
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
  },

  loginUser: async (req, res) => {
    try {
      const { user_email, user_password } = req.body;
      const {
        rows: [user],
      } = await findEmail(user_email);
      if (!user) {
        return res.json({ message: "Email is incorrect" });
      }
      const validPassword = bcrypt.compareSync(
        user_password,
        user.user_password
      );
      if (!validPassword) {
        return res.json({ message: "Password is incorrect" });
      }
      delete user.user_password;
      const payload = {
        user_email: user.user_email,
      };
      user.token = authHelper.generateToken(payload);
      user.refreshToken = authHelper.refreshToken(payload);
      commonHelper.response(res, user, 201, "Token created");
    } catch (err) {
      console.log(err);
    }
  },

  profile: async (req, res) => {
    const user_email = req.payload.user_email;
    const {
      rows: [user],
    } = await findEmail(user_email);
    delete user.user_password;
    commonHelper.response(res, user, 201);
  },

  updateUser: async (req, res) => {
    try {
      const user_id = String(req.params.id);
      // const result = await cloudinary.uploader.upload(req.file.path);
      // const image = result.secure_url;
      const { user_email, user_fullname, user_nickname, user_bio } = req.body;
      const { rowCount } = await findId(user_id);
      if (!rowCount) {
        res.json({ message: "ID is Not Found" });
      }
      const data = {
        user_id,
        user_email,
        user_fullname,
        user_nickname,
        user_bio,
      };
      updateUser(data)
        .then((result) =>
          commonHelper.response(res, result.rows, 200, "Example updated")
        )
        .catch((err) => res.send(err));
    } catch (error) {
      console.log(error);
    }
  },

  refreshToken: (req, res) => {
    const RefreshToken = req.body.refreshToken;
    const decoded = jwt.verify(RefreshToken, process.env.SECRETE_KEY_JWT);
    const payload = {
      user_email: decoded.user_email,
    };
    const result = {
      token: authHelper.generateToken(payload),
      refreshToken: authHelper.refreshToken(payload),
    };
    commonHelper.response(res, result, 200, "Token has refreshed");
  },
};

module.exports = usersController;
