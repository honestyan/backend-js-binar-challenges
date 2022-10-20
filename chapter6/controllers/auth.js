const { User, Biodata, History, Admin } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { JWT_SIGNATURE_KEY } = process.env;

module.exports = {
  register: async (req, res, next) => {
    try {
      const { username, email, password } = req.body;
      const existEmail = await User.findOne({ where: { email: email } });
      if (existEmail) {
        return res.status(409).json({
          status: false,
          message: "email already used!",
        });
      }

      const existUser = await User.findOne({ where: { username: username } });
      if (existUser) {
        return res.status(409).json({
          status: false,
          message: "username already used!",
        });
      }

      const encryptedPassword = await bcrypt.hash(password, 10);
      const user = await User.create({
        username,
        email,
        password: encryptedPassword,
        stage: 0,
        point: 0,
        ip: req.ip,
        last_login: new Date(),
      });
      return res.status(201).json({
        status: true,
        message: "success",
        data: {
          name: user.username,
          email: user.email,
        },
      });
    } catch (error) {
      next(error);
    }
  },
  login: async (req, res, next) => {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ where: { username: username } });
      if (!user) {
        return res.status(404).json({
          status: false,
          message: "user not found!",
        });
      }

      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        return res.status(401).json({
          status: false,
          message: "wrong password!",
        });
      }

      const token = jwt.sign(
        {
          id: user.id,
          username: user.username,
          email: user.email,
        },
        JWT_SIGNATURE_KEY
      );
      return res.status(200).json({
        status: true,
        message: "success",
        data: {
          token: token,
          name: user.username,
          email: user.email,
        },
      });
    } catch (error) {
      next(error);
    }
  },
  changePassword: async (req, res, next) => {
    try {
      const { oldPassword, newPassword, confirmNewPassword } = req.body;

      if (newPassword !== confirmNewPassword) {
        return res.status(400).json({
          status: false,
          message: "new password and confirm new password doesn't match!",
        });
      }

      const { id } = req.user;
      const user = await User.findOne({ where: { id: id } });

      const isValidPassword = await bcrypt.compare(oldPassword, user.password);
      if (!isValidPassword) {
        return res.status(401).json({
          status: false,
          message: "wrong password!",
        });
      }

      const encryptedPassword = await bcrypt.hash(newPassword, 10);
      await User.update({ password: encryptedPassword }, { where: { id: id } });
      return res.status(200).json({
        status: true,
        message: "success",
      });
    } catch (error) {
      next(error);
    }
  },
  deleteAccount: async (req, res, next) => {
    try {
      const { id } = req.user;
      const user = await User.findOne({ where: { id: id } });

      await User.destroy({ where: { id: id } });
      return res.status(200).json({
        status: true,
        message: "success",
      });
    } catch (error) {
      next(error);
    }
  },
  adminLogin: async (req, res, next) => {
    try {
      const { username, password } = req.body;
      const user = await Admin.findOne({ where: { username: username } });

      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        return res.status(401).json({
          status: false,
          message: "wrong password!",
        });
      }

      const token = jwt.sign(
        {
          id: user.id,
          username: user.username,
          role: user.role,
        },
        JWT_SIGNATURE_KEY
      );
      return res.status(200).json({
        status: true,
        message: "success",
        data: {
          token: token,
          name: user.username,
          email: user.email,
        },
      });
    } catch (error) {
      next(error);
    }
  },
  getAllUserBiodataHistory: async (req, res, next) => {
    try {
      const user = await User.findAll();
      const biodata = await Biodata.findAll();
      const history = await History.findAll();
      return res.status(200).json({
        status: true,
        message: "success",
        data: {
          user,
          biodata,
          history,
        },
      });
    } catch (error) {
      next(error);
    }
  },
  getUserBiodataHistory: async (req, res, next) => {
    try {
      const { id } = req.user;
      const user = await User.findOne({ where: { id: id } });
      const biodata = await Biodata.findOne({ where: { user_id: id } });
      const history = await History.findAll({ where: { user_id: id } });

      return res.status(200).json({
        status: true,
        message: "success",
        data: {
          user: user,
          biodata,
          history,
        },
      });
    } catch (error) {
      next(error);
    }
  },
  getUserBiodataHistoryById: async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = await User.findOne({ where: { id: id } });
      const biodata = await Biodata.findOne({ where: { user_id: id } });
      const history = await History.findAll({ where: { user_id: id } });

      return res.status(200).json({
        status: true,
        message: "success",
        data: {
          user,
          biodata,
          history,
        },
      });
    } catch (error) {
      next(error);
    }
  },
  // adminAdd: async (req, res, next) => {
  //   try {
  //     const { username, password } = req.body;
  //     const user = await Admin.findOne({ where: { username: username } });
  //     if (user) {
  //       return res.status(409).json({
  //         status: false,
  //         message: "username already exist!",
  //       });
  //     }

  //     const encryptedPassword = await bcrypt.hash(password, 10);
  //     await Admin.create({
  //       username: username,
  //       password: encryptedPassword,
  //     });
  //     return res.status(201).json({
  //       status: true,
  //       message: "success",
  //     });
  //   } catch (error) {
  //     next(error);
  //   }
  // },
};
