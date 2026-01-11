const sequelize = require("../config/db");
const User = require("./user");
const Project = require("./project");
const Bug = require("./bug");
const ProjectTester = require("./projectTester");

// Define associations
User.hasMany(Project, { foreignKey: "ownerId" });
Project.belongsTo(User, { foreignKey: "ownerId" });

User.hasMany(Bug, { foreignKey: "reportedBy" });
Bug.belongsTo(User, { foreignKey: "reportedBy" });

User.hasMany(Bug, { foreignKey: "assignedTo" });
Bug.belongsTo(User, { foreignKey: "assignedTo" });

Project.hasMany(Bug, { foreignKey: "projectId" });
Bug.belongsTo(Project, { foreignKey: "projectId" });

Project.belongsToMany(User, {
  through: ProjectTester,
  as: "testers",
  foreignKey: "projectId"
});

User.belongsToMany(Project, {
  through: ProjectTester,
  as: "testerProjects",
  foreignKey: "userId"
});

module.exports = {
  sequelize,
  User,
  Project,
  Bug,
  ProjectTester
};
