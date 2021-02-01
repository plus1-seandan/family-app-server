const models = require("../models");

const getGroup = async (userId) => {
  const me = await models.Member.findOne({ where: { userId } });
  const group = await models.Group.findOne({ where: { id: me.groupId } });
  console.log({ group });
  const allMemberIds = await models.Member.findAll({
    where: { groupId: me.groupId },
  });
  const promises = allMemberIds.map(async (member) => {
    return await models.User.findOne({ where: { id: member.userId } });
  });

  const members = await Promise.all(promises);
  return { id: 1, groupName: "My Family", members };
};

const getGroupId = async (userId) => {
  const me = await models.Member.findOne({ where: { userId } });
  return me.groupId;
};

module.exports = { getGroup, getGroupId };
