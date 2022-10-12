'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Biodata extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Biodata.init({
    user_id: DataTypes.INTEGER,
    fullname: DataTypes.STRING,
    dob: DataTypes.DATE,
    phone: DataTypes.STRING,
    gender: DataTypes.ENUM('male', 'female'),
    address: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Biodata',
  });
  return Biodata;
};