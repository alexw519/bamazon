var mysql = require("mysql");
var inquirer = require("inquirer");
var totalItems = 0;

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
    console.log("Welcome To Bamazon!\n");
    showAll();
    buyProduct();
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

//This Function Allows The User To Pick An Item And Buy As Many As There Is Available
function buyProduct()
{
    //Prompt To Get The Item And How Many To Look For
    inquirer.prompt([
        {
            type: "input",
            message: "What is the ID of the item that you would like to buy?",
            name: "idSelection",

            //Making Sure The User Is Picking Something In The Database
            validate: function(value)
            {
                if (value < 1 || value > totalItems)
                    return false;
                else if (isNaN(value))
                    return false;
                else
                    return true;
            }
        },

        //Asks The User How Many They Would Like To Buy
        {
            type: "input",
            message: "How many would you like to buy?",
            name: "quantitySelection",
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
        //Query To View All Products (Should Be 1) Under That item_id
        connection.query("select * from products where ?", [{item_id: answers.idSelection}], function(error, response)
        {
            if (error) throw (error);
            var totalPrice = 0;

            //If There Isn't Enough, Won't Process The Sale
            if (answers.quantitySelection > parseInt(response[0].stock_quantity))
                console.log("Insufficent Quanity");

            //Else If There Is Enough, Removes The Quantity From The Table
            else
            {
                totalPrice = answers.quantitySelection * response[0].price;

                //Query To Remove The Amount Purchased From The Table
                connection.query("update products set ? where ?",
                [{
                    stock_quantity: response[0].stock_quantity - answers.quantitySelection
                },
                {
                    item_id: answers.idSelection
                },
                function(error, res)
                {
                    if (error) throw (error);
                }])

                //Tells The User The Total Price
                console.log("\nYour total is $" + totalPrice);
            }
            connection.end();
        })
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