'use strict';
require('dotenv').config();
const home = require("./home/home");
const modals = require("./modals/modal_order");
const messages = require("./messages/message_order");
const tools = require("./tools");
const db = require("./database/db");
const { App } = require('@slack/bolt');

/**
 * Initializes  app with bot token and signing secret
 * @type {App}
 */
const app = new App({
    token: process.env.SLACK_BOT_TOKEN,
    signingSecret: process.env.SLACK_SIGNING_SECRET,
    appToken: process.env.SLACK_APP_TOKEN,
    socketMode: true
});

(async () => {
    // Start your app
    await app.start(process.env.PORT || 3000);
    console.log('⚡️ Bolt app is running!');
})();

app.error((error) => {
    console.error(error); //app error handling
});

//-----------------------------------------------------------------------------------------------------------------------------
//Message listeners
//-----------------------------------------------------------------------------------------------------------------------------

/**
 *  Listens to incoming messages that contain "hi / :wave:".
 */
app.message('hello', async ({ message, say }) => {

    app.message(':wave:', async ({ message, say }) => {
        await say(`Hello, <@${message.user}>. Welcome to the Order Management`);
    });
    app.message('hi', async ({ message, say }) => {
        await say(`Hello, <@${message.user}>. Welcome to the Order Management`);
    });
});

//-----------------------------------------------------------------------------------------------------------------------------
//Shortcuts
//-----------------------------------------------------------------------------------------------------------------------------

/**
 * Global Shortcut to create a new Order
 * setup global shortcut in App config with `launch_order` as callback id
 * add `commands` scope
 */
app.shortcut('launch_order', async ({ shortcut, body, ack, context, client }) => {
    try {
        await ack(); // Acknowledge shortcut request
        const result = await client.views.open(modals.newOrder(shortcut)); // Call the views.open method using one of the built-in WebClients
    }
    catch (error) {
        console.error(error);
    }
});

/**
 * View A for modal_new_order
 */
app.view('view_a', async ({ ack, body, view, client }) => {
    try {
        await ack(); // Acknowledge view_a request
        const values = tools.extractKeysOfModalViewSubmitResult(view.state.values); //get values returned back from Modal
        db.setOrder(values); //save order into DB (TODO: use real DB instead of file)
        await client.chat.postMessage(messages.orderArrived(values, body)); //send message to user, informing a package has arrived (TODO:send to multiple users)
    }
    catch (error) {
        console.error(error);
    }
});

//-----------------------------------------------------------------------------------------------------------------------------
//Home
//-----------------------------------------------------------------------------------------------------------------------------

/**
 * Setup the Home-tab
 */
app.event('app_home_opened', async ({ event, client, context}) => {
    try {
        let orders = db.getOrders(5);
        const result = await client.views.publish(home.setHome(event, orders)); //view.publish is the method that the app uses to push a view to the Home tab
    }
    catch (error) {
        console.error(error);
    }

});

/**
 * Show a modal with some help regarding the App
 */
app.action('id_help', async ({ body, client, ack , action}) => {
    // Acknowledge the action
    try {
        await ack(); // Acknowledge shortcut request
        const result = await client.views.open(modals.help(body)); // Call the views.open method using one of the built-in WebClients
    }
    catch (error) {
        console.error(error);
    }
});

/**
 *
 */
app.action('id_new_order', async ({ body, client, ack , action}) => {
    // Acknowledge the action
    try {
        await ack(); // Acknowledge shortcut request
        const result = await client.views.open(modals.newOrder(body)); // Call the views.open method using one of the built-in WebClients
    }
    catch (error) {
        console.error(error);
    }
});


//-----------------------------------------------------------------------------------------------------------------------------
//Slash Commands
//-----------------------------------------------------------------------------------------------------------------------------

/**
 * Listen for a slash command /orders invocation. Return the last n orders received
*/
app.command('/orders', async ({ command, ack, payload, context ,client, say}) => {
    console.log("running command list...");
    try {
        await ack(); // Acknowledge shortcut request
        let ord;
        if(command.text > 0) ord = db.getOrders(command.text);
        else ord=db.getOrder();

        await say(`> Hey <@${command.user_name}>, here the details of the last ${command.text} Orders`);
        for(const order in ord.orders){
            await client.chat.postMessage(messages.orderHistory(ord.orders[order], command.user_id) );
        }
    }
    catch (error) {
        console.error(error);
    }
});