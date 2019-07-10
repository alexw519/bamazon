var mysql = require("mysql");
var inquirer = require("inquirer");
var totalItems = 0;
//Setting Up The Connections
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
    console.log("Welcome To Bamazon!\n");
    showAll();
    connection.end();
})

//Function To Show All Of The Items In The Product Table
function showAll()
{
    connection.query("select * from products", function(error, response)
    {
        if (error) throw (error);
        displayItems(response);
    })
}

function buyProduct()
{
    inquirer.prompt([
        {
            type: "input",
            message: "What is the ID of the item that you would like to buy?",
            name: "idSelection",
            validate: function(value)
            {
                if (value < 1 || value > totalItems)
                    return false;
                else
                    return true;
            }
        },
        {
            type: "input",
            message: "How many would you like to buy?",
            name: "quanitySelection",
            validate: function(value)
            {
                if (isNaN(value))
                    return false;
                else
                    return true;
            }            
        }
    ]).then(function()
    {

    })
}

//Functon That Displays The Name, ID, & Price Of The Items From The Query
function displayItems(response)
{
    for (i = 0; i < response.length; i++)
    {
        totalItems++;
        console.log
        (
            "Name: " + response[i].product_name + "\n",
            "ID: " + response[i].item_id + "\n",
            "Price: " + response[i].price + "\n"
        )
    }
}