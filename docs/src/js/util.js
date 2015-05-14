path = require("path");

module.exports = {
  lib: function(subpath) {
    subpath = subpath || "";
    return path.join(__dirname, "../../../lib/", subpath);
  }
};
