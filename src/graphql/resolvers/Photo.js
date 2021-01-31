const models = require("../../models");
const formatErrors = require("../../utils/formatErrors");

const PhotoResolver = {
  Query: {},
  Mutation: {
    // login: (parent, { email, password }, { models, req, res }) =>
    //   tryLogin(email, password, models, SECRET, SECRET2),
    postPhoto: async (parent, args, { models }) => {
      try {
        const photo = await models.Photo.create(args);
        return {
          ok: true,
          photo: photo,
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

module.exports = PhotoResolver;
