const Employee = require("../models/employeeModel"); // Assuming the model file is in a 'models' directory

async function getAllEmployees(req, res) {
  try {
    const employees = await Employee.find();
    console.log(employees);
    return res.json(employees);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

module.exports = {
  getAllEmployees,
};
