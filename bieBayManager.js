
var mysql = require('mysql');
var inquirer = require('inquirer');
var confirm = require('inquirer-confirm');

var listInvent = [];

var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'bieBay'
});

connection.connect(function(err) {
    if (err) throw err;

    console.log('ADMIN LOG IN');
    init();

    function init() {
    inquirer.prompt([
        {
            type: 'list',
            message: 'Choose a selection',
            name: 'adminChoice',
            choices: ['View products for Sale', 'View Low Inventory', 'Add to Inventory', 'Add New Product']
        }
    ]).then(function (res) {
        switch (res.adminChoice) {
            case 'View products for Sale':
                inventorySee();
                break;
            case 'View Low Inventory':
                lowStock();
                break;
            case 'Add to Inventory':
                addInventory();
                break;
            case 'Add New Product':
                addProd();
                break;
        }
    })
}

    function inventorySee() {
        connection.query('SELECT `items_id`, `product_name`, `department_name`, `price`, `stock_quantity` FROM `products`', function (err, data) {

            if (err) throw err;

            console.log('\nSTOCK AVAILABLE');
            for (var i = 0; i < data.length; i++) {
                console.log('ID', data[i].items_id + ' *' + data[i].product_name + '  || Stock', data[i].stock_quantity);
            }
            console.log('');
            repeat()
        });
    }

    function lowStock() {
        connection.query('SELECT `items_id`, `product_name`, `department_name`, `price`, `stock_quantity` FROM `products` WHERE `stock_quantity` < 20', function (err, data) {

            if (err) throw err;

            console.log('\nSTOCKS LESS THAN 20x');
            for (var i = 0; i < data.length; i++) {
                console.log('Product:', data[i].product_name + '  ||  Stock left: ', data[i].stock_quantity);
            }
            console.log('');
            repeat()
        })
    }

    function addInventory() {
        connection.query('SELECT `product_name` FROM `products`', function(err, data) {
            if (err) throw err;
            for (var i = 0; i < data.length; i++) {
                listInvent.push(data[i].product_name)
            }
             inquirer.prompt([
                    {
                        type: 'list',
                        message: 'Choose a product',
                        name: 'prodChoose',
                        choices: listInvent
                    }, {
                        type: 'input',
                        message: 'Modify product stock: ',
                        name: 'stockQuant'
                     }
                 ]).then(function (res) {
                    connection.query('UPDATE `products` SET `stock_quantity`= ? WHERE `product_name`= ?', [res.stockQuant, res.prodChoose], function (err, data) {
                        if (err) throw err;

                        console.log('Stock updated for ' + res.prodChoose);
                        console.log('');
                        repeat()
                    })
                })
            })
    }

    function addProd() {
        inquirer.prompt([
            {
                type: 'input',
                message: 'Product to ADD:',
                name: 'productName'
            }, {
                type: 'input',
                message: 'Department Location:',
                name: 'departmentName'
            }, {
                type: 'input',
                message: 'Price:',
                name: 'price'
            }, {
                type: 'input',
                message: 'Stock Quantity:',
                name: 'stockQuantity'
            }, {
                type: 'input',
                message: 'Autographed (CHOOSE: 0 for YES, or 1 for NO): ',
                name: 'autographed'
            }
        ]).then(function (res) {
            connection.query('INSERT INTO `products` (`product_name`, `department_name`, `price`, `stock_quantity`, `autographed`) VALUES (?,?,?,?,?)', [res.productName, res.departmentName, res.price, res.stockQuantity, res.autographed], function (err, data) {
                if (err) throw err;
                console.log('New product add to inventory\n');
                repeat()
            });
        });
    }

    function repeat() {
        confirm('Want to go back to Options?', 'OK')
            .then(function confirmed(a) {
                console.log(a);
                init()
            }, function cancelled() {
                console.log('\nThanks for work with us.');
            });
    }
});