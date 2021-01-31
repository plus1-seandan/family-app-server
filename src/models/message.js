const { Sequelize } = require("sequelize");

const db = require("./db");

const Message = db.define("message", {
  text: {
    type: Sequelize.STRING,
  },
});

Message.associate = (models) => {
  //messages belong to a channel
  Message.belongsTo(models.Group, {
    foreignKey: "groupId",
  });
  //messages belong to a user
  Message.belongsTo(models.User, {
    foreignKey: "userId",
  });
};

module.exports = Message;
