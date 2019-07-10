var mysql = require("mysql");

var connection = mysql.createConnection
({
    host: "127.0.0.1",
    port: 3306,
    user: "root",
    password: "",
    database: "bamazon"
})

connection.connect(function(error)
{
    if (error) throw (error);
    console.log("Welcome To Bamazon!\n");
    connection.end();
})

function displayItems(response)
{
    for (i = 0; i < response.length; i++)
    {
        console.log
        (
            "ID: " + response[i].item_id,
            "Name: " + response[i].product_name,
            "Price: " + response[i].price
        )
    }
}