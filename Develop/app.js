const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const htmlRenderer = require("./lib/htmlRenderer");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const employees = [];

inquirer
  .prompt([
    {
      type: "input",
      message: "Please enter the Managers name:",
      name: "managerName",
    },
    {
      type: "input",
      message: "What is the Managers id?",
      name: "managerId",
    },
    {
      type: "input",
      message: "What is the Managers email?",
      name: "managerEmail",
    },
    {
      type: "input",
      message: "What is the Managers office number?",
      name: "managerOfficeNumber",
    },
    {
      type: "list",
      message: "Would you like to input an engineer?",
      choices: ["yes", "no"],
      name: "engineerYesNo",
    },
  ])
  .then((answers) => {
    const manager = new Manager(
      answers.managerName,
      answers.managerId,
      answers.managerEmail,
      answers.managerOfficeNumber
    );
    employees.push(manager);

    let engineerYesNo = answers.engineerYesNo;
    let engineerName = answers.engineerName;
    let engineerID = answers.engineerID;
    let engineerEmail = answers.engineerEmail;
    let engineerGitHub = answers.engineerGitHub;

    let internYesNo = answers.internYesNo;
    let internName = answers.internName;
    let internID = answers.internID;
    let internEmail = answers.internEmail;
    let internSchool = answers.internSchool;
    const internYes = () => {
      if (internYesNo === "yes") {
        inquirer
          .prompt([
            {
              type: "input",
              message: "Enter intern name:",
              name: "internName",
            },
            {
              type: "input",
              message: "Enter intern id:",
              name: "internId",
            },
            {
              type: "input",
              message: "Enter intern email:",
              name: "internEmail",
            },
            {
              type: "input",
              message: "Enter intern school:",
              name: "internSchool",
            },
            {
              type: "list",
              message: "Would you like to input another intern?",
              choices: ["yes", "no"],
              name: "internYesNo",
            },
          ])
          .then((answers) => {
            const intern = new Intern(
              answers.internName,
              answers.internId,
              answers.internEmail,
              answers.internSchool
            );
            employees.push(intern);
            internYesNo = answers.internYesNo;
            if (internYesNo === "yes") {
              internYes();
            } else {
              const htmlResult = htmlRenderer(employees);
              fs.writeFileSync("finished.html", htmlResult, "utf-8");
            }
          });
      }
    };

    const internPrompt = () => {
      inquirer
        .prompt([
          {
            type: "list",
            message: "Would you like to input an intern?",
            choices: ["yes", "no"],
            name: "internYesNo",
          },
        ])
        .then((answers) => {
          internYesNo = answers.internYesNo;
          internYes();
        });
    };
    const engineerYes = () => {
      if (engineerYesNo === "yes") {
        inquirer
          .prompt([
            {
              type: "input",
              message: "Enter engineer name:",
              name: "engineerName",
            },
            {
              type: "input",
              message: "Enter engineer id:",
              name: "engineerId",
            },
            {
              type: "input",
              message: "Enter engineer email:",
              name: "engineerEmail",
            },
            {
              type: "input",
              message: "Enter engineers GitHub username",
              name: "engineerGitHub",
            },
            {
              type: "list",
              message: "Would you like to input another engineer?",
              choices: ["yes", "no"],
              name: "engineerYesNo",
            },
          ])
          .then((answers) => {
            const engineer = new Engineer(
              answers.engineerName,
              answers.engineerId,
              answers.engineerEmail,
              answers.engineerGitHub
            );
            employees.push(engineer);
            engineerYesNo = answers.engineerYesNo;
            console.log(engineerYesNo);
            if (engineerYesNo === "yes") {
              engineerYes();
            } else {
              internPrompt();
            }
          });
      } else {
        internPrompt();
      }
    };
    engineerYes();
  });

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
