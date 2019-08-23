var mysql = require("mysql");
var inquirer = require("inquirer");


var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "mynewpassword",
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("Welcome to Bamazon, ");
    queryeverything();
});

function queryeverything() {
    connection.query("SELECT * FROM products", function (err, res) {
        for (var i = 0; i < res.length; i++) {
            console.log("\n" + res[i].item_id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity)
        };

        firstPrompt();
    });

    function firstPrompt() {
        inquirer.prompt([
            {
                name: "pdID",
                type: "input",
                message: "Please enter Item ID you like to get.",
            },
            {
                name: "quantity",
                type: "input",
                message: "How many items do you want?",
            },
        ]).then(function (answers) {
            var quantityNeed = answers.quantity;
         
            var query = "SELECT item_Id, product_name, price, stock_quantity FROM products WHERE ?";

            connection.query(query, { item_Id: answers.pdID}, function (err, res) {
                var actualAmount = res[0].stock_quantity
                if (quantityNeed > actualAmount) {
                    console.log("\nINSUFFICIENT QUANTITY: Im sorry, there is only " + actualAmount + " of that product currently in stock.\n");
                    firstPrompt();
                } else {
                    var queryUpdate = "UPDATE products SET ? WHERE ?";
                    connection.query(queryUpdate, [{ stock_quantity: actualAmount - quantityNeed }, { item_Id: res[0].item_Id }], function (err, response) { });
                 
                    console.log("The total cost of your purchase today comes to $" + (quantityNeed * res[0].price) + "\n");
                    inquirer
                        .prompt([
                            {
                                type: 'confirm',
                                name: 'confirm',
                                message: "Would you like to confirm this purchase? "
                            }
                        ]).then(answer => {
                            if (answer === true) {
                                console.log("You should recive an email shortly confirming your purchase of " + quantityNeed + " " + res[0].product_name + " for $" + (quantityNeed * res[0].price) + "\n")
                            }
                            firstPrompt();
                        })
                }
            })
        })
    }
}
    


