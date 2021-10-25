'use strict';

const fs = require('fs');
const fileName = `orders_received.json`;

/**
 * Create a json file that stored the received Orders for each user (Yeah.. I should be using a DB :P ) *
 * @param values
 */
const setOrder = (values) => {
    let order = new Object();
    order.order_id =  values["id_order_id"].value;
    order.user = values["id_responsible"].selected_users[0];
    order.supplier_narme = values["id_supplier_narme"].value;
    order.arrival_date = values["id_datepicker"].selected_date;

    fs.open(fileName, 'r', (err, data) => {
        if (err) {
            let obj = {
                orders: []
            };
            obj.orders.push(order);
            fs.writeFile(fileName, JSON.stringify(obj, null, 2), 'utf8', (err) => {
                if (err) throw err;
                console.log(`${fileName} has been created`);
            });
        } else {
            fs.readFile(fileName, 'utf8', (err, data) => {
                if (err) throw err;
                let obj = JSON.parse(data); // Object
                obj.orders.push(order);

                fs.writeFile(fileName, JSON.stringify(obj, null, 2), 'utf8', (err) => {
                    if (err) throw err;
                    console.log(`New data added to ${fileName}`);
                });
            });
        }

    })
};

/**
 * Get last inserted Order
 * @returns {*}
 */
const getOrder = () => {
    return this.getOrders(1);
}

/**
 * Get a list of the last n Orders. If n <= 0 it returns all entries
 * @param n
 * @returns {*}
 */
const getOrders = (n) =>{
    try {
        const data = fs.readFileSync(fileName, 'utf8')
        let obj = JSON.parse(data); // Object
        if (n > 0 ){
            let obj2 = {
                orders: []
            };

            if (n>obj.orders.length) n =obj.orders.length;
            for(let i = (obj.orders.length -n); i < obj.orders.length; i++){
                obj2.orders.push(obj.orders[i]);
            }

            return obj2;
        }
        else return obj;

    } catch (err) {
        console.error(err)
    }
}

module.exports = { setOrder, getOrder, getOrders };
