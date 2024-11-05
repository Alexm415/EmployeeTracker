const inquirer = require("inquirer");
const { Pool } = require("pg");
const { default: Choice } = require("inquirer/lib/objects/choice");
const { title } = require("process");
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
      userChoice(answer.Menu);
    });

  function userChoice(answer) {
    if (answer === "View All Employees") {
      viewAllEmployees();
    } else if (answer === "View All Roles") {
      viewAllRoles();
    } else if (answer === "View All Departments") {
      viewAllDepartments();
    } else if (answer === "Add Employee") {
      addEmployee();
    } else if (answer === "Update Employee Role") {
      updateEmployee();
    } else if (answer === "Add Role") {
      addRole();
    } else if (answer === "Add Department") {
      addDepartment();
    }
  }
};
function viewAllEmployees() {
  pool.query(
    `SELECT e.id, e.first_name, e.last_name, r.title FROM employee e JOIN role r ON r.id = e.role_id `,
    function (err, { rows }) {
      console.table(rows);
      tracker();
    }
  );
}
function viewAllRoles() {
  pool.query(
    `SELECT r.id, r.title, r.salary , d.name as Department  FROM role r JOIN department d ON d.id = r.department_id `,
    function (err, { rows }) {
      console.table(rows);
      tracker();
    }
  );
}
function viewAllDepartments() {
  pool.query(`SELECT * FROM department`, function (err, { rows }) {
    console.table(rows);
    tracker();
  });
}
function addEmployee() {
  pool.query(`SELECT * FROM role`, function (err, { rows }) {
    if (err) {
      console.log(err);
    } else {
      const roles = rows;
      const rolesClean = roles.map((role) => {
        return { value: role.id, name: role.title };
      });
      console.log(roles);
      console.log(rolesClean);
      pool.query(`SELECT * FROM employee`, function (err, { rows }) {
        if (err) {
          console.log(err);
        } else {
          const employees = rows;

          const employeesClean = employees.map((employee) => {
            return {
              value: employee.id,
              name: `${employee.first_name} ${employee.last_name}`,
            };
          });
          inquirer
            .prompt([
              {
                name: "fristname",
                type: "input",
                message: "Whats the frist name?",
              },
              {
                name: "lastname",
                type: "input",
                message: "Whats the last name?",
              },

              {
                name: "role",
                type: "list",
                message: "Pick the role?",
                choices: rolesClean,
              },
              {
                name: "employeeid",
                type: "list",
                message: "Pick  manager the id?",
                choices: employeesClean,
              },
            ])
            .then((answer) => {
              console.log(answer);
              console.table(rows);
              pool.query(
                `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1,$2,$3,$4)`,
                [
                  answer.fristname,
                  answer.lastname,
                  answer.role,
                  answer.employeeid,
                ]
              );
              tracker();
            });
        }
      });
    }
  });
}

function updateEmployee() {
  pool.query(`SELECT * FROM role`, function (err, { rows }) {
    if (err) {
      console.log(err);
    } else {
      const roles = rows;
      const rolesClean = roles.map((role) => {
        return { value: role.id, name: role.title };
      });
      pool.query(`SELECT * FROM employee`, function (err, { rows }) {
        if (err) {
          console.log(err);
        } else {
          const employees = rows;
          const employeesClean = employees.map((employee) => {
            return {
              value: employee.id,
              name: `${employee.first_name} ${employee.last_name}`,
            };
          });
          inquirer
            .prompt([
              {
                name: "employeeid",
                type: "list",
                message: "pick the role",
                choices: employeesClean,
              },
              {
                name: "role",
                type: "list",
                message: "pick the role",
                choices: rolesClean,
              },
            ])
            .then((answer) => {
              console.table(rows);
              console.log(answer);
              pool.query(`UPDATE employee SET role_id  = $2 WHERE id = $1  `, [
                answer.employeeid,
                answer.role,
              ]);

              tracker();
            });
        }
      });
    }
  });
}

function addRole() {
  pool.query(`SELECT * FROM role`, function (err, { rows }) {
    if (err) {
      console.log(err);
    } else {
      const roles = rows;
      const rolesClean = roles.map((role) => {
        return { value: role.id, name: role.title };
      });

      inquirer
        .prompt([
          {
            name: "newRole",
            type: "input",
            message: "Whats the new Role?",
          },
          {
            name: "salaryrole",
            type: "input",
            message: "Whats the salary?",
          },
        ])
        .then((answer) => {
          console.table(rows);
          console.log(answer);
          pool.query(`INSERT INTO role (title, salary) VALUES ($1, $2)`, [
            answer.newRole,
            answer.salaryrole,
          ]);
          tracker();
        });
    }
  });
}

function addDepartment() {
  pool.query(`SELECT * FROM department`, function (err, { rows }) {
    if (err) {
      console.log(err);
    } else {
      const Depart = rows;

      inquirer
        .prompt([
          {
            name: "newDepart",
            type: "input",
            message: "Whats the new Department?",
          },
        ])
        .then((answer) => {
          console.log(answer);
          pool.query(`INSERT INTO department (name) VALUES ($1)`, [
            answer.newDepart,
          ]);
          console.table(rows);
          tracker();
        });
    }
  });
}

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
tracker();
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
