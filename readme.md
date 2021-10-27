Orders Management System - with Slack
======================================================================
This is an example of POV for Slack, 

**The project is divided in 2 parts:**
1. **Slack app** which can launched with:  `<npm run dev>` or `<node app.js>`
2. **Admin-Orders-Management** area. This is a simulation of the Admin-Area where the admin can send a reminder to slack using a Webhook. <br>The mini-project has been stored under the folder **_web_**. It can be launched with
   `<node web/app.js>`

* The project does not include a real Database, which has been temporarily replaced by a JSON-file 

Slack Manifest
===============

You can also find in the file _manigest.yml_ the used configuration for the App in [Salck](https://api.slack.com/apps)  
For this project we used the _Socket mode_

Installation
=======
cd orders/  
npm install

Future improvements
====================

* Workflow to send reminder (after 3-4 days) for not claimed packages
* Tracking when an Orders has been fully deliverd (in case of multiple packages, arrived at different times)
* Use of a real DB
* Search of the orders status (claimed / not claimed)
* Send a notification message to channel and multiple users
* Delete an order (inserted by mistake)
* Edit an existing order
* Statistics (number of orders per week/month etc.)



