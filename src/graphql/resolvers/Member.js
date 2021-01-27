const { getUser } = require("../../utils/user");

const MemberResolver = {
  Query: {
    // messages: requiresAuth.createResolver(
    //   async (parent, { channelId }, { models, user }) => {
    //     return models.Message.findAll(
    //       { where: { channelId: channelId } },
    //       { order: [["createdAt", "ASC"]] },
    //       { raw: true }
    //     );
    //   }
    // ),
  },
  Mutation: {
    addMember: async (parent, args, { models }) => {
      try {
        const member = await models.Member.create({
          groupId: args.groupId,
          userId: args.userId,
          user: getUser(args.userId),
        });
        return member;
      } catch (err) {
        console.log(err);
        return false;
      }
    },
  },
};

module.exports = MemberResolver;
