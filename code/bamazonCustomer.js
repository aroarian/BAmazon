var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "7654321z",
  database: "bamazon"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  available();
});

function available() {
  connection.query("SELECT * FROM products", function(err, results) {
    if (err) throw err;

    for (var i = 0; i < results.length; i++) {
      console.log("----------------");
      console.log("ID: " + results[i].id);
      console.log("Item: " + results[i].product_name);
      console.log("Price: $" + results[i].price);
      console.log("----------------");
    }

    inquirer
      .prompt([
        {
          type: "input",
          name: "itemID",
          message: "What item (by ID) would you like to purchase? "
        },
        {
          type: "input",
          name: "amount",
          message: "How many would you like to purchase? "
        }
      ])
      .then(answers => {
        for (var i = 0; i < results.length; i++) {
          if (results[i].id === parseInt(answers.itemID)) {
            if (results[i].stock_quantity >= parseInt(answers.amount)) {
              var newQuanity = (results[i].stock_quantity - answers.amount);
              var id = results[i].id;
              var price = (results[i].price * answers.amount)
              connection.query(`UPDATE products SET stock_quantity = ${newQuanity} WHERE id = ${id}`, function(err, res){
                if (err) throw err;
              
                console.log(`Your order has been placed. We have charged your card: $${price.toFixed(2)}`);
              connection.end();
             })
            }
            else{
              console.log("Not enough in stock.");
              connection.end();
            }
          }
        }
      });
  });
}
