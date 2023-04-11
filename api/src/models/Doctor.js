const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "doctor",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        unique: true,
        autoIncrement: true,
      },
      dni: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
      },
      code: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
      },
      full_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      gender: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      age: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      birthday: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      phone: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      image: {
        type: DataTypes.STRING,
        defaultValue:
          "https://ceslava.s3-accelerate.amazonaws.com/2016/04/mistery-man-gravatar-wordpress-avatar-persona-misteriosa-510x510.png",
      },
      is_delete: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      is_delivery: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      is_morning: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      is_evening: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    { timestamps: false }
  );
};
