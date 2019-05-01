CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
	item_id INTEGER (100), NOT NULL
    product_name VARCHAR (255),
    department_name VARCHAR (255),
    price DECIMAL (10,2),
    stock_quantity INTEGER NULL,
    PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Cactus Socks", "clothing", 12.90, 120), 
("Posture Trainer", "Sports and Outdoors" 79.95, 217), 
("Eyeliner Brush", "Beauty and Personal Care", 8.99, 500),
("Bourbon Coffee", "Grocery and Gourmet Food", 28.45, 40),
("Disposable Hand Towels", "Health and Household", 19.99, 100),
("Stainless Steel Water Bottle", "Sports and Outdoors", 17.99, 45),
("Soft Silicone Earplugs", "Health and Household", 17.49, 4),


