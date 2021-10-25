'use strict';

/**
 * Show a message when a package has arrived
 * @param view
 * @returns {{blocks: [{text: {text: string, type: string}, type: string}, {text: {text: string, type: string}, type: string, accessory: {alt_text: string, image_url: string, type: string}, block_id: string}, {type: string, fields: [{text: string, type: string}], block_id: string}], channel: string, text: string}}
*/
const orderArrived = (values, body) => {
    const user = body.user.id;
    const order_id = values["id_order_id"].value;
    const to_user = values["id_responsible"].selected_users[0];
    const supplier_narme = values["id_supplier_narme"].value;
    const arrival_date = values["id_datepicker"].selected_date;

    let my_message = {
        channel: "#orders",//+to_user,
        text: {}, //`Dear <@${user}>, the order <${order_id}> has arrived <${arrival_date}> from <${supplier_narme}> and is available to be picked up`
        blocks: [
            {
                "type": "section",
                "text": {
                    "type": "mrkdwn",
                    "text": `Dear <@${to_user}>, your order ${order_id} has arrived and is available for collection! :package:`
                }
            },
            {
                "type": "divider"
            },
            {
                "type": "header",
                "text": {
                    "type": "plain_text",
                    "text": ":white_check_mark: Order details",
                    "emoji": true
                }
            },
            {
                "type": "divider"
            },
            {
                "type": "section",
                "block_id": "section789",
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
        ]

    }
    return my_message;
}

const orderHistory = (values, user) => {
    const order_id = values.order_id;
    const to_user = values.user;
    const supplier_narme = values.supplier_narme;
    const arrival_date = values.arrival_date;

    let my_message = {
        channel: user,
        text: {}, //`Dear <@${user}>, the order <${order_id}> has arrived <${arrival_date}> from <${supplier_narme}> and is available to be picked up`
        blocks: [
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
                "block_id": "section789",
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
        ]

    }
    return my_message;
}
module.exports={orderArrived, orderHistory};