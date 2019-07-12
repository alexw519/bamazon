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
            choices: ["View Products For Sale", "View Low Inventory", "Add To Inventory", "Add New Product", "Exit"]
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

            case "Exit":
                connection.end();
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
        connection.end();
    })
}

function addInventory()
{
    inquirer.prompt([
        {
            type: "input",
            name: "idSelection",
            message: "Put the id of the product that should be updated.",
            validate: function(value)
            {
                if (isNaN(value))
                    return false;
                else
                    return true;
            }
        },
        {
            type: "input",
            name: "quantityToAdd",
            message: "How many of the item should be added.",
            validate: function(value)
            {
                if (isNaN(value))
                    return false;
                else
                    return true;
            }
        }
    ]).then(function(answers)
    {
        // connection.query("update products set stock_quantity = stock_quantity + " + answers.quantityToAdd + " where ?",
        connection.query("update products set ? where ?",
        [
        {
            stock_quantity: answers.quantityToAdd
        },
        {
            item_id: answers.idSelection
        },
        function(error, res)
        {
            if (error) throw (error);
            connection.end();
        }])
    })
    // connection.end();
}

function addProduct()
{
    inquirer.prompt([
        {
            type: "input",
            message: "Enter Product: ",
            name: "product"
        },
        {
            type: "input",
            message: "Enter Department Name: ",
            name: "department"
        },
        {
            type: "input",
            message: "Enter Price: ",
            name: "cost"
        },
        {
            type: "input",
            message: "How Many Of The Product Is There: ",
            name: "stock"
        }
    ]).then(function(answers)
    {
        connection.query("insert into products (product_name, department_name, price, stock_quantity) values (?, ?, ?, ?)",
        [
            answers.product,
            answers.department,
            answers.cost,
            answers.stock,
            function (error, response)
            {
                if (error) throw (error);

            }])
        console.log("Added " + answers.product + " to inventory!");
        connection.end();
    })

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