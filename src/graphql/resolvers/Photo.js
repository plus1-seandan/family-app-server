const models = require("../../models");
const formatErrors = require("../../utils/formatErrors");
const fs = require("fs");
const path = require("path");

const PhotoResolver = {
  Query: {},
  Mutation: {
    deletePhoto: async (parent, args, { models }) => {
      try {
        const photo = await models.Photo.findOne({
          where: { id: args.photoId },
        });
        const photoUrl = photo.url.split("/");
        const fileName = photoUrl[photoUrl.length - 1];
        // console.log({ path });
        photoUrl[photoUrl.length - 1];
        const pathName = path.join(
          __dirname,
          `/../../../public/images/${fileName}`
        );
        fs.unlink(pathName, (err) => {
          if (err) {
            console.log(err);
            return;
          }
        });
        //remove the file from url
        await models.Photo.destroy({ where: { id: args.photoId } });
        return true;
      } catch (e) {
        console.log(e);
        return false;
      }
    },
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
