const { DataTypes, DATEONLY } = require("sequelize");
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "schedule",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
      },
      date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      hour_start: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      hour_end: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    { timestamps: false }
  );
};
