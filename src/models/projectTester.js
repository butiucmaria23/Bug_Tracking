const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const ProjectTester = sequelize.define("ProjectTester", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true }
});

module.exports = ProjectTester;
