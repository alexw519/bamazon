var mysql = require("mysql");
var inquirer = require("inquirer");

//Setting Up The Connection
var connection = mysql.createConnection
({
    host: "127.0.0.1",
    port: 3306,
    user: "root",
    password: "",
    database: "bamazon"
})

viewMenu();

//View The Options Which Call A Different Function
function viewMenu()
{
    inquirer.prompt([
        {
            type: "list",
            name: "userAction",
            message: "What would you like to do?",
            choices: ["View Products Sales By Department", "Create New Department", "Exit"]
        }
    ]).then(function(user)
    {
        switch (user.userAction)
        {
            case "View Products Sales By Department":
                viewSales();
                break;

            case "Create New Department":
                createDepartment();
                break;

            case "Exit":
                connection.end();
                break;
        }
    });
}

function viewSales()
{
    //select department_name, format(sum(product_sales), 1) as total_sales from bamazon.products group by department_name;
    connection.query("select department_name, format(sum(product_sales), 1) as total_sales from products group by department_name",
    function(error, response)
    {
        if (error) throw (error);
    })
}

function createDepartment()
{
    inquirer.prompt([
        {
            type: "input",
            message: "Enter Department Name: ",
            name: "depart_name"
        },
        {
            type: "input",
            message: "Enter Overhead Costs Name: ",
            name: "costs"
        }
    ]).then(function(answers)
    {
        connection.query("insert into departments (department_name, costs) values (?, ?)",
        [
            answers.depart_name,
            answers.costs,
            function (error, response)
            {
                if (error) throw (error);
                console.log("Added a " + answers.depart_name + "!");
                viewMenu();
            }])
    })
}