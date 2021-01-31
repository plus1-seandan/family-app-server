const { Sequelize } = require("sequelize");
const bcrypt = require("bcrypt");

const db = require("./db");

const User = db.define("user", {
  username: {
    type: Sequelize.STRING,
    unique: true,
    validate: {
      isAlphanumeric: {
        args: true,
        msg: "The username can only contain letters and numbers",
      },
      len: {
        args: [3, 25],
        msg: "The username needs to be betwee 3 to 25 characters",
      },
    },
  },
  email: {
    type: Sequelize.STRING,
    unique: true,
    validate: {
      isEmail: {
        args: true,
        msg: "invalid email",
      },
    },
  },
  photo: {
    type: Sequelize.STRING,
  },
  firstName: {
    type: Sequelize.STRING,
  },
  lastName: {
    type: Sequelize.STRING,
  },
  dateOfBirth: {
    type: Sequelize.DATE,
  },
  password: {
    type: Sequelize.STRING,
  },
});

User.addHook("beforeValidate", async (user) => {
  const hashedPassword = await bcrypt.hash(user.password, 12);
  user.password = hashedPassword;
});
User.associate = (models) => {
  User.belongsToMany(models.Group, {
    through: models.Member,
    foreignKey: "userId",
  });
  User.belongsToMany(models.User, {
    through: models.Relationship,
    as: "Me",
    foreignKey: "me",
  });
  User.belongsToMany(models.User, {
    through: models.Relationship,
    as: "You",
    foreignKey: "you",
  });
};

module.exports = User;
