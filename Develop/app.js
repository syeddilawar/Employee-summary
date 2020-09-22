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
    //engineer questions
    {
      type: "list",
      message: "Would you like to input an engineer?",
      choices: ["yes", "no"],
      name: "engineerYesNo",
    },
  ])
  .then((answers) => {
    //manager answers
    const manager = new Manager (answers.managerName, answers.managerId, answers.managerEmail, answers.managerOfficeNumber)
    employees.push(manager);

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
