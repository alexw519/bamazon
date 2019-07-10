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
    showAll();
    connection.end();
})

function showAll()
{
    connection.query("select * from products", function(error, response)
    {
        if (error) throw (error);
        displayItems(response);
    })
}

function displayItems(response)
{
    for (i = 0; i < response.length; i++)
    {
        console.log
        (
            "Name: " + response[i].product_name + "\n",
            "ID: " + response[i].item_id + "\n",
            "Price: " + response[i].price + "\n"
        )
    }
}