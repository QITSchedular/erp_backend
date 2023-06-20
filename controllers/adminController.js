const AdminControl = require("../models/adminModel");
const { showNested } = require("../utils/authFilter");

async function updateAdminControl(req, res) {
  try {
    const { role, basicJson, copyJson, users } = req.body;

    // Check if there is an existing AdminControl document
    const existingAdminControl = await AdminControl.findOne();

    if (!existingAdminControl) {
      // Create a default AdminControl document if none exists
      await AdminControl.create({ role, basicJson, copyJson, users });
      return res.status(201).json({ message: "AdminControl document created" });
    }

    // Update the basicJson field of the existing AdminControl document
    const updatedData = await AdminControl.findOneAndUpdate(
      {},
      { basicJson },
      { new: true }
    );

    return res.json(updatedData);
  } catch (error) {
    console.error("Error updating AdminControl:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

//get the full admin data
async function getAdminControl(req, res) {
  try {
    const adminControlData = await AdminControl.findOne();

    if (!adminControlData) {
      return res.status(404).json({ error: "AdminControl document not found" });
    }

    return res.json(adminControlData);
  } catch (error) {
    console.error("Error retrieving AdminControl:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

// fetch avaibaleModules data of the specific user
async function fetchAvailableModules(req, res) {
  try {
    const { userId } = req.body;

    const adminControlData = await AdminControl.findOne({
      "users.userId": userId,
    });

    if (!adminControlData) {
      return res.status(404).json({ error: "AdminControl document not found" });
    }

    const user = adminControlData.users.find((user) => user.userId === userId);
    const availableModules = user.availableModules;

    return res.json(availableModules);
  } catch (error) {
    console.error("Error fetching available modules:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

//update the available modules
async function updateAvailableModules(req, res) {
  try {
    const { userId, updatedAvailableModules } = req.body;

    const adminControlData = await AdminControl.findOne({
      "users.userId": userId,
    });

    if (!adminControlData) {
      return res.status(404).json({ error: "AdminControl document not found" });
    }

    // Find the user and update its availableModules
    const user = adminControlData.users.find((user) => user.userId === userId);
    user.availableModules = updatedAvailableModules;

    // Save the updated AdminControl document
    const updatedAdminControl = await adminControlData.save();

    return res.json(updatedAdminControl);
  } catch (error) {
    console.error("Error updating available modules:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

// show dataTo the user
async function showAuthDataToUser(req, res) {
  try {
    const { userId } = req.params;

    const adminControlData = await AdminControl.findOne({
      "users.userId": userId,
    });
    if (!adminControlData) {
      return res.send("AdminControl document not found");
    }
    const user = adminControlData.users.find((user) => user.userId === userId);
    const availableModules = user.availableModules;
    console.log("available modules: " + availableModules);
    const table = showNested(availableModules, "", 0);
    res.send(`<table>${table}</table>`);
  } catch (error) {}
}

async function addValuesToUsersArray(req, res) {
  try {
    const { userId, availableModules } = req.body;

    const adminControlData = await AdminControl.findOne();

    if (!adminControlData) {
      return res.status(404).json({ error: "AdminControl document not found" });
    }

    // Find the user with the given userId
    const user = adminControlData.users.find((user) => user.userId === userId);

    if (user) {
      // If the user already exists, update the availableModules
      user.availableModules = availableModules;
    } else {
      // If the user doesn't exist, create a new user object and push it to the users array
      adminControlData.users.push({ userId, availableModules });
    }

    // Save the updated adminControlData
    const updatedData = await adminControlData.save();

    return res.json(updatedData);
  } catch (error) {
    console.error("Error updating AdminControl:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = {
  updateAdminControl,
  getAdminControl,
  fetchAvailableModules,
  updateAvailableModules,
  showAuthDataToUser,
  addValuesToUsersArray,
};
