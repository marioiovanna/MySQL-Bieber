
var mysql = require('mysql');
var inquirer = require('inquirer');
var confirm = require('inquirer-confirm');
var itemList = [];
var idChosen;
var quantityChosen;
var total;
var changeStock;
var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'bieBay'
});

connection.connect(function(err) {
    if (err) throw err;

    console.log('Welcome to the Bieber Store\n    *Products on Sale*\n');
    initialPrompt();

    function initialPrompt() {
        connection.query('SELECT `items_id`, `product_name`, `price` FROM `products`', function (err, data) {
            if (err) throw err;
            for (var i = 0; i < data.length; i++) {
                itemList.push(data[i]);
                console.log('ID', data[i].items_id + ' *' + data[i].product_name + '  ||  Price: $', data[i].price)
            }
            console.log('');

            inquirer.prompt([
                {
                    type: 'input',
                    message: 'What whould you like to buy today?\n   (enter product by ID please)\n     ==>',
                    name: 'itemChoice'
                }
            ]).then(function (response) {
                idChosen = response.itemChoice;
                connection.query('SELECT `items_id`, `product_name`, `price`, `stock_quantity` FROM `products` WHERE `items_id` = ?', [idChosen], function (err, data) {
                    if (idChosen > itemList.length) {
                        console.log('');
                        console.log('ID not valid, please enter one from the list\n');
                        initialPrompt()
                    }
                    else {
                        console.log('');
                        console.log('You chose ' + data[0].product_name + ' price is $' + data[0].price);
                        checkAmount();
                    }

                    function checkAmount() {
                        inquirer.prompt([
                            {
                                type: 'input',
                                message: 'How many ' + data[0].product_name + 'would you like?',
                                name: 'quantity'
                            }
                        ]).then(function (response) {
                            quantityChosen = response.quantity;
                            if (data[0].stock_quantity > quantityChosen) {
                                total = data[0].price * quantityChosen;
                                changeStock = data[0].stock_quantity - quantityChosen;
                                console.log('\nYour total is: $' + total + '\n');
                                repeat();
                                connection.query('UPDATE `products` SET `stock_quantity` = ?  WHERE `items_id` = ?', [changeStock, idChosen])
                            }
                            else {
                                console.log('\nSorry! We do not have enough inventory for your request');
                                console.log('We have', data[0].stock_quantity, 'total in stock');
                                console.log('Please try a different amount');
                                checkAmount();
                            }
                        })
                    }

                    function repeat() {
                        confirm('Want buy some more?', 'OK')
                            .then(function confirmed(a) {
                                console.log(a);
                                initialPrompt();
                            }, function cancelled() {
                                console.log('\nThanks for your visit!');
                            });
                    }
                })
            })
        })
    }
});
