// var subscription = web3.eth.subscribe('logs', {
//   address: '0x123456..',
//   topics: ['0x12345...']
// }, function(error, result){
//   if (!error)
//     console.log(result);
// })
//   .on("data", function(log){
//     console.log(log);
//   })
//   .on("changed", function(log){
//   });
//
// // unsubscribes the subscription
// subscription.unsubscribe(function(error, success){
//   if(success)
//     console.log('Successfully unsubscribed!');
// });
//
//
var FoodieContract = require("./Food");

var Web3 = require("web3");
var web3 = new Web3(Web3.givenProvider || "ws://localhost:7545");


// var myContract = new web3.eth.Contract([], '0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe', {
//   gasPrice: '20000000000' // default gas price in wei, 20 gwei in this case
// });

// const networkId = await web3.eth.net.getId();
// const deployedNetwork = FoodieContract.networks[networkId];

const myContract = new web3.eth.Contract(FoodieContract.abi,  '0xDF4e680d7e2B69741324bcCf541d5b21B6D0EC5d');
console.log(myContract.options.address);

myContract.events.allEvents({}, function(error, event){ console.log(event); })
  .on('data', function(event){
    console.log(event); // same results as the optional callback above
  })
  .on('changed', function(event){
    // remove event from local database
    console.log(event);
  })
  .on('error', console.error);
