const models = require("../../models");
const formatErrors = require("../../utils/formatErrors");
const { getGroupId } = require("../../utils/group");
const Sequelize = require("sequelize");
const db = require("../../models/db");

const EventResolver = {
  Query: {
    getUpcomingEvents: async (parent, args, { models, req }) => {
      try {
        const groupId = await getGroupId(req.userId);
        if (!groupId) {
          return null;
        }
        const events = await models.Event.findAll({
          where: {
            groupId,
            startDate: {
              [Sequelize.Op.gte]: db.fn("NOW"),
            },
          },
          order: ["startDate"],
        });
        return events;
      } catch (e) {
        console.log(e);
        // return {
        //   ok: false,
        //   errors: formatErrors(err),
        // };
      }
    },
  },
  Mutation: {
    createEvent: async (parent, args, { models, req }) => {
      try {
        const groupId = await getGroupId(req.userId);
        if (!groupId) {
          return null;
        }
        const event = await models.Event.create({ ...args, groupId });
        return {
          ok: true,
          event: event,
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

module.exports = EventResolver;
