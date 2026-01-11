const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Bug = sequelize.define("Bug", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },

  severity: {
    type: DataTypes.ENUM("LOW", "MEDIUM", "HIGH"),
    allowNull: false
  },

  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },

  commitLink: {
    type: DataTypes.STRING,
    allowNull: true
  },

  status: {
    type: DataTypes.ENUM("OPEN", "IN_PROGRESS", "RESOLVED"),
    defaultValue: "OPEN"
  }
});

module.exports = Bug;
