// import requiresAuth, { requiresTeamAccess } from "../permissions";
// import { withFilter, PubSub } from "apollo-server-express";
// import pubsub from "../../pubsub";

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
  //   Message: {
  //     user: ({ user, userId }, args, { models }) => {
  //       if (user) {
  //         return user;
  //       }
  //       return models.User.findOne(
  //         { logging: false, where: { id: userId } },
  //         { raw: true }
  //       );
  //     },
  //   },
  Query: {
    messages: async (parent, { groupId }, { models }) => {
      return models.Message.findAll(
        { where: { groupId: groupId } },
        { order: [["createdAt", "ASC"]] },
        { raw: true }
      );
    },
  },
  Mutation: {
    createMessage: async (parent, args, { models }) => {
      try {
        console.log("hit this line ");
        const me = await models.User.findOne(
          { where: { id: 12 } },
          { raw: true }
        );

        const message = await models.Message.create({
          ...args,
          userId: 12,
          groupId: args.groupId,
        });
        // const currentUser = await models.User.findOne({
        //   where: {
        //     id: me.id,
        //   },
        // });
        // pubsub.publish(NEW_CHANNEL_MESSAGE, {
        //   channelId: args.channelId,
        //   newChannelMessage: {
        //     ...message.dataValues,
        //     // user: currentUser.dataValues,
        //     user: user,
        //   },
        // });
        return true;
      } catch (err) {
        console.log(err);
        return false;
      }
    },
  },
};

module.exports = MessageResolver;
