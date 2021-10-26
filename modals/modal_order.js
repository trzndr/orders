'use strict';
/**
 * Modal after an order has been received
 * @param tr
 * @returns {{view: {notify_on_close: boolean, submit: {emoji: boolean, text: string, type: string}, callback_id: string, blocks: [{text: {text: string, type: string}, type: string}, {type: string}, {label: {emoji: boolean, text: string, type: string}, type: string, element: {action_id: string, placeholder: {text: string, type: string}, type: string}}, {label: {emoji: boolean, text: string, type: string}, type: string, element: {action_id: string, placeholder: {text: string, type: string}, type: string}}, {label: {emoji: boolean, text: string, type: string}, type: string, element: {action_id: string, placeholder: {emoji: boolean, text: string, type: string}, type: string}}, null], type: string, title: {emoji: boolean, text: string, type: string}, close: {emoji: boolean, text: string, type: string}}, trigger_id}}
 */
const newOrder = (tr) => {
    let d = new Date();
    let today = d.getFullYear()+ "-" +(d.getMonth()+1) + "-" +d.getDate();

    let my_modal = {
        trigger_id: tr.trigger_id,
        view: {
            "type": "modal",
            "callback_id": "view_a",
            "notify_on_close": true,
            "title": {
                "type": "plain_text",
                "text": "Order Data",
                "emoji": true
            },
            "submit": {
                "type": "plain_text",
                "text": "Submit",
                "emoji": true
            },
            "close": {
                "type": "plain_text",
                "text": "Cancel",
                "emoji": true
            },
            "blocks": [
                {
                    "type": "section",
                    "text": {
                        "type": "mrkdwn",
                        "text": ":package: *Enter the details of the order received* :package:"
                    }
                },
                {
                    "type": "divider"
                },
                {
                    "type": "input",
                    "element": {
                        "type": "plain_text_input",
                        "action_id": "id_order_id",
                        "placeholder": {
                            "type": "plain_text",
                            "text": "enter here the order ID"
                        }
                    },
                    "label": {
                        "type": "plain_text",
                        "text": "Order ID",
                        "emoji": true
                    }
                },
                {
                    "type": "input",
                    "element": {
                        "type": "plain_text_input",
                        "action_id": "id_supplier_narme",
                        "placeholder": {
                            "type": "plain_text",
                            "text": "enter here the supplier name"
                        }
                    },
                    "label": {
                        "type": "plain_text",
                        "text": "Supplier Name (from)",
                        "emoji": true
                    }
                },
                {
                    "type": "input",
                    "element": {
                        "type": "multi_users_select",
                        "placeholder": {
                            "type": "plain_text",
                            "text": "Select users",
                            "emoji": true
                        },
                        "action_id": "id_responsible"
                    },
                    "label": {
                        "type": "plain_text",
                        "text": "Responsible (to)",
                        "emoji": true
                    }
                },
                {
                    "type": "input",
                    "element": {
                        "type": "datepicker",
                        "initial_date": today,
                        "placeholder": {
                            "type": "plain_text",
                            "text": "Select a date",
                            "emoji": true
                        },
                        "action_id": "id_datepicker"
                    },
                    "label": {
                        "type": "plain_text",
                        "text": "Arrival Date",
                        "emoji": true
                    }
                }
            ]
        }
    }
    return my_modal;
}

/**
 *
 * @returns {{blocks: [{type: string}, {text: {text: string, type: string}, type: string}, {type: string}, {text: {text: string, type: string}, type: string}, {text: {text: string, type: string}, type: string}, null, null]}}
 */
const help = (trigger) => {
    let my_modal = {
        "trigger_id": trigger.trigger_id,
        "view": {
            "type": "modal",
            "callback_id": "view_home_a",
            "notify_on_close": true,
            "title": {
                "type": "plain_text",
                "text": "Help"
            },
            "close": {
                "type": "plain_text",
                "text": "Close"
            },
            "blocks": [
                {
                    "type": "divider"
                },
                {
                    "type": "section",
                    "text": {
                        "type": "mrkdwn",
                        "text": "Here are some of the commands you can use with tehe Order App."
                    }
                },
                {
                    "type": "divider"
                },
                {
                    "type": "section",
                    "text": {
                        "type": "mrkdwn",
                        "text": "*orders*\n To get a list of the last orders received."
                    }
                },
                {
                    "type": "section",
                    "text": {
                        "type": "mrkdwn",
                        "text": "*Syntax*\n `/orders <num. of last orders received>`\n*Example*\n `/orders 2` shows the list of the last 2 orders received."
                    }
                },
                {
                    "type": "divider"
                },
                {
                    "type": "context",
                    "elements": [
                        {
                            "type": "mrkdwn",
                            "text": ":pushpin: Have feedback or questions? Contact us at info@myemail.com."
                        }
                    ]
                }
            ]
        }
    }
    return my_modal;
}

module.exports={newOrder, help};