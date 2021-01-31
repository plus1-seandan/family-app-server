const models = require("../models");

const getGroup = async (userId) => {
  const me = await models.Member.findOne({ where: { userId } });
  const allMemberIds = await models.Member.findAll({
    where: { groupId: me.groupId },
  });
  console.log({ allMemberIds });

  const promises = allMemberIds.map(async (member) => {
    return await models.User.findOne({ where: { id: member.userId } });
  });
  const members = await Promise.all(promises);
  return {
    id: me.groupId,
    members,
  };
};

const getGroupId = async (userId) => {
  const me = await models.Member.findOne({ where: { userId } });
  return me.groupId;
};

module.exports = { getGroup, getGroupId };
