const { DataTypes, DATEONLY } = require("sequelize");
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "ticketMedical",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      observations: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      hour: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      is_confirmed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      is_delete: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      is_canceled: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    { timestamps: false }
  );
};
