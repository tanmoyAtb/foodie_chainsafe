require('dotenv').config({ path: 'variables.env' });

const express = require('express');
const webPush = require('web-push');
const bodyParser = require('body-parser');
const path = require('path');
// web3
var DeployedContract = require("./chain/contract/Food");
var Web3 = require("web3");
var web3 = new Web3(Web3.givenProvider || "ws://localhost:7545");

const app = express();

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'client')));

const publicVapidKey = process.env.PUBLIC_VAPID_KEY;
const privateVapidKey = process.env.PRIVATE_VAPID_KEY;
const contractAddr = process.env.CONTRACT_ADDR;

webPush.setVapidDetails('mailto:test@example.com', publicVapidKey, privateVapidKey);

// Subscribe route
let subscriptions = [];
app.post('/subscribe', (req, res) => {
  subscriptions.push(req.body);
  console.log("Added: " + req.body);

  res.status(201).sendFile("sw.js");
});

// Subscribe web3
const myContract = new web3.eth.Contract(DeployedContract.abi,  contractAddr);
console.log(myContract.options.address);

myContract.events.allEvents({}, function(error, event){ console.log(event); })
  .on('data', function(event){
    if(subscriptions.length >0) {
      console.log("Sending a notification....");
      const payload = JSON.stringify({
        title: `Event triggered with data: ${event.event}`,
      });
      for(i = 0; i< subscriptions.length; i++) {
        if(hasAddress(event, subscriptions[i].address)) {
          webPush.sendNotification(subscriptions[i].subscription, payload)
            .catch(error => console.error(error));
        }
      }
    }
  })
  .on('changed', function(event){
    console.log(event);
  })
  .on('error', console.error);

function hasAddress(event, address){
  let args = event.returnValues;
  // console.log(args);
  for(arg in args){
    // console.log(arg, args[arg], address);
    if(args[arg] == address) {
      return true;
    }
  }
  return false;
}

app.set('port', process.env.PORT || 5000);
const server = app.listen(app.get('port'), () => {
  console.log(`Express running → PORT ${server.address().port}`);
});
