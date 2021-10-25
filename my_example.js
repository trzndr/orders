//example1
// say() sends a message to the channel where the event was triggered
//await say(`Hey there <@${message.user}>!`);
//--------------------------

await say({
    blocks: [
        {
            "type": "section",
            "text": {
                "type": "mrkdwn",
                "text": `Hey there <@${message.user}>!`
            },
            "accessory": {
                "type": "button",
                "text": {
                    "type": "plain_text",
                    "text": "Click Me"
                },
                "action_id": "button_click"
            }
        }
    ],
    text: `Hey there <@${message.user}>!`
});

app.action('button_click', async ({ body, ack, say }) => {
    // Acknowledge the action
    await ack();
    await say(`<@${body.user.id}> clicked the button`);
});


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Listen and respond to button click
app.action('id_order_received', async({action, ack, say, respond }) => {
    try {

        console.log('button clicked');
        // acknowledge the request right away
        await ack();

        //await say('Thanks for clicking the fancy button');
        // Call the views.open method using one of the built-in WebClients

        const result = await client.views.open({
            trigger_id: action.action_ts,//"156772938.1827394",
            view: {
                type: "modal",
                title: {
                    type: "plain_text",
                    text: "My App"
                },
                close: {
                    type: "plain_text",
                    text: "Close"
                },
                blocks: [
                    {
                        type: "section",
                        text: {
                            type: "mrkdwn",
                            text: "About the simplest modal you could conceive of :smile:\n\nMaybe <https://api.slack.com/reference/block-kit/interactive-components|*make the modal interactive*> or <https://api.slack.com/surfaces/modals/using#modifying|*learn more advanced modal use cases*>."
                        }
                    },
                    {
                        type: "context",
                        elements: [
                            {
                                type: "mrkdwn",
                                text: "Psssst this modal was designed using <https://api.slack.com/tools/block-kit-builder|*Block Kit Builder*>"
                            }
                        ]
                    }
                ]
            }
        });
        /*
         */
    }catch (error) {
        console.error(error);
    }
});