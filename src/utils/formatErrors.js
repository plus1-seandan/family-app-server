const _ = require("lodash");

const formatErrors = (e) => e.errors.map((x) => _.pick(x, ["path", "message"]));

module.exports = formatErrors;
