const { Sequelize } = require("sequelize");
const bcrypt = require("bcrypt");

const db = require("./db");

const Project = db.define("user", {
  projectName: {
    type: Sequelize.STRING,
  },
  startDate: {
    type: Sequelize.DATE,
    validate: {
      isDate: true, // only allow date strings
    },
  },
  targetEndDate: {
    type: Sequelize.DATE,
    validate: {
      isDate: true, // only allow date strings
    },
  },
  actual_end_date: {
    type: Sequelize.DATE,
    validate: {
      isDate: true, // only allow date strings
    },
  },
});

Project.associate = (models) => {
  Project.belongsToMany(models.User, {
    through: models.Member,
    foreignKey: "projectId",
  });
  //   User.belongsToMany(models.Channel, {
  //     through: "channelMember",
  //     foreignKey: "userId",
  //   });
};

module.exports = Project;
