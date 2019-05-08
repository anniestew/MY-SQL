var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require("cli-table");

var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "",
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connection:", err)
    var displayAll = function () {
        console.log("inside displayALL")
        var query = "Select * FROM products";
        connection.query(query, function (err, res) {
            if (err) throw err;
            var displayTable = new Table({
                head: ["Item ID", "Product Name", "Catergory", "Price", "Quantity"],
                colWidths: [10, 15, 15, 10, 10]
            });
            for (var i = 0; i < res.length; i++) {
                displayTable.push(
                    [res[i].item_id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity]
                );
            }
            console.log(displayTable.toString());
            promptCustomer();


        });
    };
    displayAll();

});



function promptCustomer() {
    inquirer
        .prompt([
            {
                name: "idchoice",
                type: "input",
                message: "Please type the ID of the product you would like to buy",
                filter: Number
            },
            {
                name: "units",
                type: "input",
                message: "Please type the how many units of the product you would like to buy",
                filter: Number
            },

        ])
        .then(function (answer) {
            var itemID = parseInt(answer.idchoice);
            var quantity = answer.units;
            console.log("before select: ", itemID, quantity)
            var queryStr = "SELECT * FROM products WHERE item_id=" + itemID;
            connection.query(queryStr, function (err, data) {
                // console.log(err)
                // console.log("product:", data)
                if (err) throw err;

                if (data.length === 0) {
                    console.log('ERROR: Invalid Item ID. Please select a valid Item ID.');
                    updateStock();
                    //   updateStock(res);
                } else {
                    var productData = data[0];
                    // If the quantity requested by the user is available in stock
                    if (quantity <= productData.stock_quantity) {
                        console.log('Product you requested is in stock.');
                        var newQueryStr = 'UPDATE products SET stock_quantity = ' + (productData.stock_quantity - quantity) + ' WHERE item_id = ' + itemID;
                        console.log('newQueryStr = ' + newQueryStr);
                        console.log('Your order has been placed! Your total is $' + productData.price * quantity);
                        console.log('Thank you for shopping with us!');
                        console.log("\n---------------------------------------------------------------------\n");
                        connection.query(newQueryStr, function (err, res) {
                            console.log("great do you want anything else")
                            //console.log(res)
                            promptCustomer();

                        })
        
                    }
                    else {
                        console.log('Sorry there is not enough product in stock!');
                        console.log('Please change your order');
                        console.log("\n---------------------------------------------------------------------\n");

                        promptCustomer();

                    }
                }


            });

        });
}

function updateStock(data) {
    // verify the stock  you compare the stcok unit with the choice units
    // if enought the sell the product: update the db with the new stock
    // if not enough tell the customer sorry we dont have enough


    // Construct the db query string
    queryStr = 'SELECT * FROM products';

    // Make the db query
    connection.query(queryStr, function (err, data) {
        if (err) throw err;
        console.log('Inventory Available: ');
        console.log('...................\n');


        console.log("---------------------------------------------------------------------\n");


    
    });
}
// runBamazon executes the app
function runBamazon() {
    // console.log("___ENTER runBamazon___");

    // Displays inventory
    updateStock();
}

// Run the application
runBamazon();
    //   }




