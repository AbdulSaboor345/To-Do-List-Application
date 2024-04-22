#! /usr/bin/env node
// Importing inquirer & Chalk
import inquirer from "inquirer";
import chalk from "chalk";
// Creating an Array & Variable
let todoList = [];
let conditions = true;
// Printing a Welcome message
let line = chalk.gray('='.repeat(48));
let wcMsg = `\n${line}\n${chalk.bold.cyanBright(`Wellcome to Abdul Saboor - To-Do List Application\n`)}${line}\n`;
console.log(wcMsg);
// Using while loop to give choices to user
let main = async () => {
    while (conditions) {
        let options = await inquirer.prompt([
            {
                name: "choice",
                type: "list",
                message: chalk.yellow("Which options do you want to interact with:"),
                choices: ["Add Task", "Delete Task", "Update Task", "View To-Do List", "Exit"],
            }
        ]);
        // Using else-if to make all the choices functional
        if (options.choice === "Add Task") {
            await addTask();
        }
        else if (options.choice === "Delete Task") {
            await deleteTask();
        }
        else if (options.choice === "Update Task") {
            await updateTask();
        }
        else if (options.choice === "View To-Do List") {
            await viewTask();
        }
        else if (options.choice === "Exit") {
            conditions = false;
            console.log(chalk.red("\nThe application has been closed, The user has exit!\n"));
        }
    }
};
// Making an object for the user to add task
let addTask = async () => {
    let newTask = await inquirer.prompt([
        {
            name: "task",
            type: "input",
            message: chalk.greenBright("Enter a new Task:"),
        }
    ]);
    todoList.push(newTask.task);
    console.log(chalk.magenta(`\n"${newTask.task}", Task has been added succesfully!\n`));
};
// Making the list for the user to view it 
let viewTask = () => {
    console.log(chalk.magenta("Here is your To-Do list:"));
    todoList.forEach((task, index) => {
        console.log(chalk.cyan(`\n${index + 1}: ${task}\n`));
    });
};
// Making an object for the user to delete task
let deleteTask = async () => {
    await viewTask();
    let taskInput = await inquirer.prompt([
        {
            name: "index",
            type: "number",
            message: chalk.yellow(" please, Enter the index number of the task you want to delete! "),
        }
    ]);
    // Making it functional so the user can actually delete task
    let deleteTask = todoList.splice(taskInput.index - 1, 1);
    console.log(chalk.magenta(`\n"${deleteTask}",  This task has been deleted from the list successfully!\n`));
};
// Making an object for the user to update task
let updateTask = async () => {
    await viewTask();
    let update_task_index = await inquirer.prompt([
        {
            name: "index",
            type: "number",
            message: chalk.yellow("Please, Enter the index number of the task you want to update!"),
        },
        {
            name: "new_task",
            type: "input",
            message: chalk.greenBright("Enter a new name for your updated task:")
        }
    ]);
    // Making it functional so the user can actually update their tasks
    todoList[update_task_index.index - 1] = update_task_index.new_task;
    console.log(chalk.magenta(`\nTask at the index number.${update_task_index.index - 1} has been updated to "${update_task_index.new_task}", Successfully! \n`));
};
// Calling the function named "main"
main();
