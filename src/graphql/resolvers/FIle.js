const path = require("path");
const fs = require("fs");

const models = require("../../models");
const formatErrors = require("../../utils/formatErrors");
const { GraphQLUpload } = require("apollo-server");

const FileResolver = {
  Upload: GraphQLUpload,

  Query: {
    files: () => {
      // Return the record of files uploaded from your DB or API or filesystem.
    },
  },
  Mutation: {
    async uploadFile(parent, { file }) {
      const { stream, filename, mimetype, encoding } = await file;
      const pathName = path.join(
        __dirname,
        `/../../../public/images/${filename}`
      );
      await stream.pipe(fs.createWriteStream(pathName));
      const url = `http://localhost:4000/images/${filename}`;
      //also need to create a photo record and store the url in the database
      await models.Photo.create();

      return {
        url,
      };
    },
  },
};

module.exports = FileResolver;
