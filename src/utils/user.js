const getUser = async (userId) => {
  return await models.User.findOne({ where: { id: userId } });
};

module.exports = { getUser };
