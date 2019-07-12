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

//Connecting To The Database
connection.connect(function(error)
{
    if (error) throw (error);
    console.log("Bamazon Manager Options\n");
    viewMenu();
})

function viewMenu()
{
    inquirer.prompt([
        {
            type: "list",
            name: "userAction",
            message: "What would you like to do?",
            choices: ["View Products For Sale", "View Low Inventory", "Add To Inventory", "Add New Product"]
        }
    ]).then(function(user)
    {
        switch (user.userAction)
        {
            case "View Products For Sale":
                showAll();
                break;

            case "View Low Inventory":
                showLow();
                break;

            case "Add To Inventory":
                addInventory();
                break;

            case "Add New Product":
                addProduct();
                break;
        }
    });
}

function showAll()
{
    connection.query("select * from products", function(error, response)
    {
        if (error) throw (error);
        displayItems(response);
    })
    connection.end();
}

function showLow()
{
    connection.query("select * from products where stock_quantity < 5", function(error, response)
    {
        if (error) throw (error);
        displayItems(response);
    })
    connection.end();
}

function addInventory()
{
    connection.end();
}

function addProduct()
{
    connection.end();
}

//Functon That Displays The Name, ID, & Price Of The Items From The Query
function displayItems(response)
{
    for (i = 0; i < response.length; i++)
    {
        console.log
        (
            "Name: " + response[i].product_name + "\n",
            "ID: " + response[i].item_id + "\n",
            "Price: " + response[i].price + "\n",
            "Quantity: " + response[i].stock_quantity + "\n"
        )
    }
}