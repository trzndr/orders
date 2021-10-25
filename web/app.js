/**
 * This is a simulation of how the Admin can send a reminder via webhooks to the user, asking to claim their packages
 *
 * to run the app:
 * node web/app.js
 *
 */
const express = require("express");
var axios = require("axios");
var app = express();

app.use(
    express.urlencoded({
        extended: true
    })
)
//app.use(express.json())

app.listen(5000, () => {
    console.log("Application started and Listening on port 5000");
});

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

/**
 *  Send a reminder to User (via slack Webhook)
 */
app.post("/reminder", (req, res) => {
    var url = "https://hooks.slack.com/services/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";
    axios.post(url,modalReminder(req.body.order_id, req.body.employee, req.body.supplier, req.body.arrival_date)
    ).then((response) => {
        console.log("Request sent." );
        //res.status(200).json(response.data);
        res.redirect('/');
    }).catch((err) => {
        console.log(err);
        res.status(500).json({ message: err });
    });

});

/**
 * Modal to remind the user to pick-up the package
 *
 * @param order_id
 * @param to_user
 * @param supplier_narme
 * @param arrival_date
 * @returns {{blocks: [{text: {text: string, type: string}, type: string}, {type: string}, {text: {emoji: boolean, text: string, type: string}, type: string}, {type: string}, {type: string, fields: [{text: string, type: string}, {text: string, type: string}, {text: string, type: string}], block_id: string}, null], channel: string, text: {}}}
 */
const modalReminder = (order_id, to_user, supplier_narme, arrival_date) => {

    let my_message = {
        channel: "#orders",//+to_user,
        text: {},
        blocks: [
            {
                "type": "section",
                "text": {
                    "type": "mrkdwn",
                    "text": `:star: Dear <@${to_user}>, this is a reminder to *collect* your package.`
                }
            },
            {
                "type": "divider"
            },
            {
                "type": "header",
                "text": {
                    "type": "plain_text",
                    "text": ":bangbang: Order details",
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