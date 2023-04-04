const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "user",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
      },
      full_name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: {
            args: true,
            msg: "El campo tiene que ser un correo válido",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      user_name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      is_admin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      is_plan_pay: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      is_delete: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    { timestamps: false }
  );
};
