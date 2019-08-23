DROP DATABASE IF EXISTS bamazon;

CREATE database bamazon;

USE bamazon;

CREATE TABLE products(
    item_id INT(6) NOT NULL,
    product_name VARCHAR(75) NOT NULL,
    department_name VARCHAR(75) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    stock_quantity INT(20) NOT NULL,
    PRIMARY KEY (item_id)
);

SELECT * FROM products;

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (001, "baseball caps", "baseball", 25.99, 30),
        (202, "Spaceship", "travel", 39.99, 10),
        (303, "soccer jersey", "soccer", 15.99, 25),
        (404, "cavs shorts", "basketball", 34.85, 15),
        (515, "Mayfield", "football", 60.99, 2),
        (646, "gloves", "hockey", 40.00, 11),
        (777, "Ken Griffey", "baseball", 16.17, 4)