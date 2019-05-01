var mysql = require("mysql");
var inquirer = require("inquirer");

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

connection.connect(function(err) {
    if (err) throw err;
    displayAll();
  });

  function displayAll() {
    console.log("Selecting all products...\n");
    connection.query("SELECT * FROM products", function(err, res) {
      if (err) throw err;
      // Log all results of the SELECT statement
    //   console.log(res);
      for (var i = 0; i < res.length; i++){
        // console.log("row" + i + "---" + res[i].product_name)

      }
      //connection.end();
    });
  }

  function promptCustomer() {
    inquirer
      .prompt([
        {
        name: "idchoice",
        type: "input",
        message: "Please type the ID of the product you would like to buy",
        },
        {
        name: "units",
        type: "input",
        message: "Please type the how many units of the product you would like to buy",
        }
      ])
    .then(function(answer) {
            console.log("answer: ", answer)
            var idchoiceParse = parseInt(answer.idchoice)
            console.log(idchoiceParse)
            var unitsParse = parseInt(answer.units)
            var query = "SELECT item_id, stock_quantity FROM products WHERE ?";
            connection.query(query, { item_id: 4}, function(err, res) {
                console.log(err)
                console.log("product:", res)
              updatestock(res);
            });
          });
      }
      promptCustomer();

      function updatestock(res){
        // verify the stock  you compare the stcok unit with the choice units
        // if enought the sell the product: update the db with the new stock
        // if not enought tell the customer sorry we dont have enugh


      }



  

