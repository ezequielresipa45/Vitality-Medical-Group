const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "comment",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
      },
      comment: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    { timestamps: false }
  );
};
