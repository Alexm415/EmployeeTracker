const fs = require("fs");
const inquirer = require("inquirer");
const { Pool } = require("pg");

var tracker = function () {
  inquirer
    .prompt([
      {
        name: "Menu",
        type: "list",
        message: "What would you like to do?",
        choices: [
          "View All Employees",
          "View All Roles",
          "View All Departments",
          "Add Employee",
          "Update Employee Role",
          "Add Role",
          "Add Department",
        ],
      },
    ])
    .then((answer) => {
      console.log(answer);
      userChoice(answer);
    });

  function userChoice(answer) {
    if (answer === "View All Employees") {
      viewAllEmployees();
      tracker();
    } else if (answer === "View All Roles") {
      viewAllRoles();
      tracker();
    } else if (answer === "View All Departments") {
      viewAllDepartments();
      tracker();
    } else if (answer === "Add Employee") {
      addEmployee();
      tracker();
    } else if (answer === "Update Employee Role") {
      updateEmployee();
      tracker();
    } else if (answer === "Add Role") {
      addRole();
      tracker();
    } else if (answer === "Add Department") {
      addDepartment();
      tracker();
    }
  }
  function viewAllEmployees() {
    pool.query(`SELECT * FROM employee`, function (err, { rows }) {
      console.table(rows);
    });
  }
  function viewAllRoles() {
    pool.query(`SELECT * FROM role`, function (err, { rows }) {
      console.table(rows);
    });
  }
  function viewAllDepartments() {
    pool.query(`SELECT * FROM department`, function (err, { rows }) {
      console.table(rows);
    });
  }
  function addEmployee() {}

  function updateEmployee() {}

  function addRole() {}

  function addDepartment() {}
};
const pool = new Pool(
  {
    // TODO: Enter PostgreSQL username
    user: "postgres",
    // TODO: Enter PostgreSQL password
    password: "Mx123456$",
    host: "localhost",
    database: "employee_tracker",
  },
  console.log(`Connected to the employeeTracker database.`)
);

pool.connect();

/* pool.query(`DELETE FROM employee WHERE id = $1`, [2], (err, { rows }) => {
  if (err) {
    console.log(err);
  }
  console.log(rows);
});

// Query database
pool.query("SELECT * FROM employee", function (err, { rows }) {
  console.log(rows);
}); */
