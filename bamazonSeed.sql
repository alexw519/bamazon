DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;
USE bamazon;

create table products
(
	item_id INT NOT NULL AUTO_INCREMENT,
	product_name VARCHAR(45) NULL,
	department_name VARCHAR(45) NULL,
	price DECIMAL(6,2) NULL,
	stock_quantity INT NULL,
    product_sales INT NULL,
	PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
VALUES ("Strawberry Ice Cream", "Produce", 3.00, 7, 200);

INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
VALUES ("iPod Classic", "Electronics", 130.00, 2, 5000);

INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
VALUES ("White T-Shirt", "Clothing", 2.00 , 23, 500);

INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
VALUES ("Harry Potter Legos", "Toys", 12.00, 9, 600);

INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
VALUES ("Card Deck", "Toys", 3.00, 12, 120);

INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
VALUES ("4K UHD Television", "Electronics", 650.00, 5, 10000);

INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
VALUES ("String Cheese", "Produce", 1.00 , 41, 90);

INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
VALUES ("Pineapple", "Produce", 3.00, 7, 300);

INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
VALUES ("Black Belt", "Clothing", 14.00, 10, 700);

INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
VALUES ("Nintendo Switch", "Electronics", 250.00, 9, 2000);