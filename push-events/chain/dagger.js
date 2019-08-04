var Dagger = require("eth-dagger");

// connect to Dagger ETH main network (network id: 1) over web socket
var dagger = new Dagger("mqtt://localhost:1883"); // dagger server

// Use mqtt protocol for node (socket)
// var dagger = new Dagger('mqtts://mainnet.dagger.matic.network'); // dagger server

// get new block as soon as it gets created
// dagger.on("latest:block", function(result) {
//   console.log("New block created: ", result);
// });
//
// // get only block number (as it gets created)
// dagger.on("latest:block.number", function(result) {
//   console.log("Current block number: ", result);
// });

// 0xe1f646fb9fbd0df83871429c44bd4b7597a75929f1687574c20d54884fb10f4f
Web3.SolidityCoder = require('./lib/solidity/coder');

dagger.on("latest:log/0xdf4e680d7e2b69741324bccf541d5b21b6d0ec5d/filter/0x60fd9dfa624e807faf3af33c3043aae1ed8c6ebe194cf399a4cf6997b6b7e25c", function(result) {
  console.log("Current event triggered: ", result);
});



