const { User, History } = require("../models");

module.exports = {
  addRecord: async (req, res) => {
    const user_id = req.user.id;
    const { action, value } = req.body;
    const user = await User.findOne({ where: { id: user_id } });
    if (!user) {
      return res.status(404).json({
        status: false,
        message: "user not found!",
      });
    }

    if (action == "point") {
      await User.update(
        {
          point: user.point + value,
        },
        {
          where: {
            id: user_id,
          },
        }
      );
      const history = await History.create({
        user_id: user_id,
        action: action,
        value: value,
      });

      return res.status(201).json({
        status: true,
        message: "success",
        data: {
          history,
        },
      });
    } else if (action == "stage") {
      await User.update(
        {
          stage: user.stage + value,
        },
        {
          where: {
            id: user_id,
          },
        }
      );
      const history = await History.create({
        user_id: user_id,
        action: action,
        value: value,
      });

      return res.status(201).json({
        status: true,
        message: "success",
        data: {
          history,
        },
      });
    } else {
      return res.status(400).json({
        status: false,
        message: "action not found!",
      });
    }
  },
};
