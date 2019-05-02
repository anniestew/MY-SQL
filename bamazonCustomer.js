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
    var displayAll = function () {
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
            displayAll();
        });
    };
});


//   function displayAll() {
//     console.log("Selecting all products...\n");
//     connection.query("SELECT * FROM products", function(err, res) {
//       if (err) throw err;
//       // Log all results of the SELECT statement
//     //   console.log(res);
//       for (var i = 0; i < res.length; i++){
//         // console.log("row" + i + "---" + res[i].product_name)

//       }
//       //connection.end();
//     });
//   }

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
            // console.log("answer: ", answer)
            // var idchoiceParse = parseInt(answer.idchoice)
            // console.log(idchoiceParse)
            var itemID = answer.item_id;
            var quantity = answer.quantity;
            // var unitsParse = parseInt(answer.units)
            var queryStr = "SELECT item_id, stock_quantity FROM products WHERE ?";
            connection.query(queryStr, { item_id: itemID }, function (err, data) {
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
                        var newQueryStr = 'UPDATE products SET stock_quantity = ' + (productData.stock_quantity - quantity) + ' WHERE item_id = ' + item;
                        console.log('newQueryStr = ' + newQueryStr);
                        console.log('Your order has been placed! Your total is $' + productData.price * quantity);
                        console.log('Thank you for shopping with us!');
                        console.log("\n---------------------------------------------------------------------\n");

                        // 	// End the database connection
                        // 	connection.end();
                    }
                }

                // } else {
                // 	console.log('Sorry there is not enough product in stock!');
                // 	console.log('Please change your order');
                // 	console.log("\n---------------------------------------------------------------------\n");

                // }

            });
         updateStock();
    
        });
    }

            //  displayAll();

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


                    promptCustomer();
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




