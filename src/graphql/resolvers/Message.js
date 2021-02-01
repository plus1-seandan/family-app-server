// import requiresAuth, { requiresTeamAccess } from "../permissions";
// import { withFilter, PubSub } from "apollo-server-express";
// import pubsub from "../../pubsub";

const { getGroupId } = require("../../utils/group");

const MessageResolver = {
  //   Subscription: {
  //     newChannelMessage: {
  //       subscribe: requiresTeamAccess.createResolver(
  //         withFilter(
  //           () => pubsub.asyncIterator(NEW_CHANNEL_MESSAGE),
  //           (payload, args) => {
  //             return payload.channelId === args.channelId;
  //           }
  //         )
  //       ),
  //     },
  //   },
  Subscription: {
    newMessage: {
      // Additional event labels can be passed to asyncIterator creation
      subscribe: (_, __, { pubsub }) => pubsub.asyncIterator("NEW_MESSAGE"),
    },
  },

  Message: {
    user: async ({ user, userId }, args, { models }) => {
      let me;
      if (user) {
        me = user;
      } else {
        me = await models.User.findOne(
          { logging: false, where: { id: userId } },
          { raw: true }
        );
      }
      return me;
    },
    me: async (parent, args, { req, models }) => {
      return parent.userId === req.userId;
    },
  },

  Query: {
    messages: async (parent, args, { models }) => {
      const groupId = await getGroupId(12);
      const messages = await models.Message.findAll(
        { where: { groupId } },
        { order: [["createdAt", "ASC"]] },
        { raw: true }
      );
      return messages;
    },
  },
  Mutation: {
    createMessage: async (parent, args, { req, models, pubsub }) => {
      try {
        pubsub.publish("NEW_MESSAGE", { newMessage: args });
        const groupId = await getGroupId(req.userId);
        const me = await models.User.findOne(
          { where: { id: req.userId } },
          { raw: true }
        );

        const message = await models.Message.create({
          ...args,
          userId: req.userId,
          groupId,
        });

        return message;
      } catch (err) {
        console.log(err);
        return false;
      }
    },
  },
};

module.exports = MessageResolver;
