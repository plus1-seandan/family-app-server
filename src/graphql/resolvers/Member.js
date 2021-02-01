const formatErrors = require("../../utils/formatErrors");
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
        });
        const res = {
          ok: true,
          member: {
            ...member.dataValues,
            user: await getUser(args.userId),
          },
        };
        return res;
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

module.exports = MemberResolver;
