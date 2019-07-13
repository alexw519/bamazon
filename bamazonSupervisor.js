var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require("cli-table");

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

//Views The Department Infomation Along With The Profit For Each Department
function viewSales()
{
    var profit;
    connection.query("select department_id, products.department_name, departments.over_head_costs, sum(product_sales) as total_sales from bamazon.products right join bamazon.departments on departments.department_name = products.department_name group by products.department_name",
    function(error, response)
    {
        if (error) throw (error);
        
        //Creating The Table To put The Values In
        var table = new Table
        ({
            head: ["Department ID", "Department Name", "Over Head Costs", "Total Sales", "Profit"],
            colWidths: [15,20,20,15,10]
        });

        //Adding The Values Into The Table
        for (i = 0; i < response.length; i++)
        {
            profit = parseInt(response[i].total_sales) - parseInt(response[i].over_head_costs);
            table.push([response[i].department_id, response[i].department_name, response[i].over_head_costs, response[i].total_sales, profit]);
        }
        console.log(table.toString() + "\n");
        viewMenu();
    })
}

//Function To Create A New Department
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