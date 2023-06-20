const mongoose = require("mongoose");

const adminControlSchema = new mongoose.Schema({
  role: String,
  basicJson: Object,
  copyJson: Object,
  users: [
    {
      userId: String,
      availableModules: Object,
    },
  ],
});

const AdminControl = mongoose.model("AdminControl", adminControlSchema);

module.exports = AdminControl;

// role = "admin" // string,
// basicJson : "string",
