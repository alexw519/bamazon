DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;
USE bamazon;

create table products
(
	item_id INT NOT NULL AUTO_INCREMENT,
	product_name VARCHAR(45) NULL,
	department_name VARCHAR(45) NULL,
	price VARCHAR(45) NULL,
	stock_quantity VARCHAR(45) NULL,
	PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Strawberry Ice Cream", "Produce", 3.00, 7);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("iPod Classic", "Electronics", 130.00, 2);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("White T-Shirt", "Clothing", 2.00 , 23);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Harry Potter Legos", "Toys", 12.00, 9);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Card Deck", "Toys", 3.00, 12);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("4K UHD Television", "Electronics", 650.00, 5);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("String Cheese", "Produce", 1.00 , 41);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Pineapple", "Produce", 3.00, 7);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Black Belt", "Clothing", 14.00, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Nintendo Switch", "Electronics", 250.00, 9);