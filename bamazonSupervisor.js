var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require("cli-table");

var table = new Table
({
    head: ["Department Name", "Product Sales"],
    colWidths: [20,15]
});

//Setting Up The Connection
var connection = mysql.createConnection
({
    host: "127.0.0.1",
    port: 3306,
    user: "root",
    password: "",
    database: "bamazon"
})

//Connecting To The Database
connection.connect(function(error)
{
    if (error) throw (error);
    console.log("Bamazon Supervisor Options\n");
    viewMenu();
})

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
    connection.query("select department_name, format(sum(product_sales), 1) as total_sales from products group by department_name",
    function(error, response)
    {
        if (error) throw (error);
        for (i = 0; i < response.length; i++)
        {
            table.push([response[i].department_name, response[i].total_sales]);
        }
        console.log(table.toString());
    })
    connection.end();
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
        connection.query("insert into departments (department_name, over_head_costs) values (?, ?)",
        [
            answers.depart_name,
            answers.costs],
            function (error, response)
            {
                if (error) throw (error);
                console.log("Added a " + answers.depart_name + " Department!\n");
                viewMenu();
            })
    })
}