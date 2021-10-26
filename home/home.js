'use strict';
/**
 * Home layout under the Home-tab of the Orders-App
 * @param e
 * @returns {{view: {callback_id: string, blocks: [{text: {text: string, type: string}, type: string, accessory: {action_id: string, text: {text: string, type: string}, type: string, value: string}}, {type: string}, {text: {text: string, type: string}, type: string}, {elements: [{action_id: string, style: string, text: {emoji: boolean, text: string, type: string}, type: string, value: string}, {text: {text: string, type: string}, type: string, url: string}], type: string, block_id: string}], type: string}, user_id}}
 */
const setHome = (e, orders) => {
    let my_home = {
        /* the user that opened your app's app home */
        user_id: e.user,

        /* the view object that appears in the app home*/
        view: {
            type: 'home',
            callback_id: 'id_home_view',

            /* body of the view */
            blocks: [
                {
                    "type": "section",
                    "text": {
                        "type": "mrkdwn",
                        "text": "*Welcome to your Orders Management App's Home_* :package:\n See what else you can do with the Orders App."
                    },
                    "accessory": {
                        "type": "button",
                        "text": {
                            "type": "plain_text",
                            "text": "Help"
                        },
                        "value": "button pressed",
                        "action_id": "id_help"
                    }
                },
                {
                    "type": "section",
                    "text": {
                        "type": "mrkdwn",
                        "text": "*New order received* :package:\n Did you receive a new Order? Just click on the button and announce it to the  user."
                    },
                    "accessory": {
                        "type": "button",
                        "text": {
                            "type": "plain_text",
                            "text": "Order received"
                        },
                        "value": "button pressed",
                        "action_id": "id_new_order"
                    }
                },
                {
                    "type": "divider"
                },
                {
                    "type": "section",
                    "text": {
                        "type": "mrkdwn",
                        "text": "Below you can find the list of the last orders received:\n\n"
                    }
                },

            ]
        }
    }

    //insert list of last orders from the db
    for(const order in orders.orders) {
        const order_id = orders.orders[order].order_id;
        //const to_user = orders.orders[order].user;
        const supplier_narme = orders.orders[order].supplier_narme;
        const arrival_date = orders.orders[order].arrival_date;

        my_home.view.blocks.push(
            {
                "type": "header",
                "text": {
                    "type": "plain_text",
                    "text": `:pushpin: Order ${order_id} details`,
                    "emoji": true
                }
            },
            {
                "type": "divider"
            },
            {
                "type": "section",
                "fields": [
                    {
                        "type": "mrkdwn",
                        "text": `*Supplier*\n${supplier_narme}`
                    },
                    {
                        "type": "mrkdwn",
                        "text": `*Delivery Date*\n${arrival_date}`
                    },
                    {
                        "type": "mrkdwn",
                        "text": `*Order ID*\n${order_id}`
                    }
                ]
            },
            {
                "type": "divider"
            }
        );

    }
    return my_home;
}

module.exports={setHome};