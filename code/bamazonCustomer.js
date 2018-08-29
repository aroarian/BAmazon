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
  // connection.end();
});

function available() {
  connection.query("SELECT * FROM products", function(err, results) {
    if (err) throw err;

    for (var i = 0; i < results.length; i++) {
      console.log("----------------");
      console.log("ID: " + results[i].id);
      console.log("Item: " + results[i].product_name);
      console.log("Price: $" + results[i].price + ".00");
      console.log("----------------");
    }
  });

  inquirer
    .prompt([
      /* Pass your questions in here */
    ])
    .then(answers => {
      // Use user feedback for... whatever!!
    });
}
