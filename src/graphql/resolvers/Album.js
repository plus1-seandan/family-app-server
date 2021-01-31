const models = require("../../models");
const formatErrors = require("../../utils/formatErrors");
const { getGroupId } = require("../../utils/group");
const Sequelize = require("sequelize");
const db = require("../../models/db");

const AlbumResolver = {
  Query: {
    getAlbums: async (parent, args, { models, req }) => {
      try {
        const groupId = await getGroupId(req.userId);
        if (!groupId) {
          return null;
        }
        const albums = await models.Album.findAll({
          where: {
            groupId,
          },
          order: ["createdAt"],
        });
        return albums;
      } catch (e) {
        console.log(e);
        // return {
        //   ok: false,
        //   errors: formatErrors(err),
        // };
      }
    },

    getAlbum: async (parent, args, { models, req }) => {
      const albumId = args.albumId;
      console.log({ albumId });
      const album = await models.Album.findOne({
        where: {
          id: albumId,
        },
        raw: true,
      });

      const photos = await models.Photo.findAll({
        where: { albumId },
        raw: true,
      });
      // return album;
      const res = {
        ...album,
        photos,
      };
      return res;
    },
  },
  Mutation: {
    createAlbum: async (parent, args, { models, req }) => {
      try {
        const groupId = await getGroupId(req.userId);
        if (!groupId) {
          return null;
        }
        const album = await models.Album.create({ ...args, groupId });
        return {
          ok: true,
          album: album,
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

module.exports = AlbumResolver;
