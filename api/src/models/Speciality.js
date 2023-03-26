const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "speciality",
    {
      id: {
        type: DataTypes.INTEGER,
        //allowNull: true,
        primaryKey: true,
        autoIncrement: true,
        //unique: true,
      },
      speciality: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
    },
    { timestamps: false }
  );
};
