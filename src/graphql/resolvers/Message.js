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
      subscribe: (parent, args, context) => {
        return context.pubsub.asyncIterator("NEW_MESSAGE");
      },
    },
  },

  Message: {
    user: async (parent, args, context) => {
      let userId;
      if (!context.req) {
        userId = context.userId;
      } else {
        userId = context.req.userId;
      }
      const sender = await context.models.User.findOne(
        { logging: false, where: { id: userId } },
        { raw: true }
      );
      return sender;
    },
    me: async (parent, args, context) => {
      let userId;
      if (!context.req) {
        userId = context.userId;
      } else {
        userId = context.req.userId;
      }
      return parent.userId === userId;
    },
  },

  Query: {
    messages: async (parent, args, context) => {
      const messages = await context.models.Message.findAll(
        { where: { groupId: args.groupId } },
        { order: [["createdAt", "ASC"]] },
        { raw: true }
      );
      return messages;
    },
  },
  Mutation: {
    createMessage: async (parent, args, { req, models, pubsub }) => {
      try {
        const groupId = await getGroupId(req.userId);
        const me = await models.User.findOne(
          { where: { id: args.userId } },
          { raw: true }
        );

        const message = await models.Message.create({
          ...args,
          userId: req.userId,
          groupId,
        });
        pubsub.publish("NEW_MESSAGE", { newMessage: args });
        return message;
      } catch (err) {
        console.log(err);
        return false;
      }
    },
  },
};

module.exports = MessageResolver;
