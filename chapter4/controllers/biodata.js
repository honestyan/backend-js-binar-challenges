const { Biodata, User } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { JWT_SIGNATURE_KEY } = process.env;

module.exports = {
  addBiodata: async (req, res) => {
    try {
      const { fullname, dob, phone, gender, address } = req.body;
      const user = await User.findOne({ where: { id: req.user.id } });
      if (!user) {
        return res.status(404).json({
          status: false,
          message: "user not found!",
        });
      }

      const biodata = await Biodata.create({
        user_id: req.user.id,
        fullname,
        dob,
        phone,
        gender,
        address,
      });
      return res.status(201).json({
        status: true,
        message: "success",
        data: {
          fullname: biodata.fullname,
          dob: biodata.dob,
          phone: biodata.phone,
          gender: biodata.gender,
          address: biodata.address,
        },
      });
    } catch (error) {
      next(error);
    }
  },
  editBiodata: async (req, res) => {
    try {
      const { fullname, dob, phone, gender, address } = req.body;
      const user = await User.findOne({ where: { id: req.user.id } });
      if (!user) {
        return res.status(404).json({
          status: false,
          message: "user not found!",
        });
      }

      const biodata = await Biodata.update(
        {
          user_id: req.user.id,
          fullname,
          dob,
          phone,
          gender,
          address,
        },
        { where: { user_id: req.user.id } }
      );
      const currentBiodata = await Biodata.findOne({
        where: { user_id: req.user.id },
      });
      return res.status(201).json({
        status: true,
        message: "success",
        data: {
          biodata: currentBiodata,
        },
      });
    } catch (error) {
      next(error);
    }
  },
  getBiodata: async (req, res) => {
    try {
      const biodata = await Biodata.findOne({
        where: { user_id: req.user.id },
      });
      if (!biodata) {
        return res.status(404).json({
          status: false,
          message: "biodata not found!",
        });
      }

      return res.status(201).json({
        status: true,
        message: "success",
        data: {
          user_id: biodata.user_id,
          fullname: biodata.fullname,
          dob: biodata.dob,
          phone: biodata.phone,
          gender: biodata.gender,
          address: biodata.address,
        },
      });
    } catch (error) {
      next(error);
    }
  },
};
