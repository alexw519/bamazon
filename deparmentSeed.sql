use bamazon;

create table departments
(
	department_id INT NOT NULL AUTO_INCREMENT,
    department_name VARCHAR(45),
    over_head_costs INT,
    PRIMARY KEY (department_id)
);

INSERT INTO departments (department_name, over_head_costs)
VALUES ("Produce", 100);

INSERT INTO departments (department_name, over_head_costs)
VALUES ("Electronics", 10000);

INSERT INTO departments (department_name, over_head_costs)
VALUES ("Toys", 500);

INSERT INTO departments (department_name, over_head_costs)
VALUES ("Clothing", 1000);