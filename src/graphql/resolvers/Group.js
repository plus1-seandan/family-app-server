const models = require("../../models");
const formatErrors = require("../../utils/formatErrors");

const GroupResolver = {
  Query: {},
  Mutation: {
    // login: (parent, { email, password }, { models, req, res }) =>
    //   tryLogin(email, password, models, SECRET, SECRET2),
    createGroup: async (parent, args, { models }) => {
      try {
        const group = await models.Group.create(args);
        return {
          ok: true,
          group: group,
        };
      } catch (err) {
        console.log(err);
        return {
          ok: false,
          errors: formatErrors(err),
        };
      }
    },
  },
};

module.exports = GroupResolver;
