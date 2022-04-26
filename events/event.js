const Web3 = require("web3");
const { abi, addressSC, webSocketInfura } = require("../constants/infura");

// Web3
const provider = new Web3.providers.WebsocketProvider(webSocketInfura);
const web3Infura = new Web3(provider);
const contractInfura = new web3Infura.eth.Contract(abi, addressSC);
// console.log(contractInfura);

// Create contract Metamask
const web3 = new Web3(webSocketInfura);
const contractMetamask = new web3.eth.Contract(abi, addressSC);
console.log("Metamask: ", contractMetamask);

// Listen event from Minigame contract
contractInfura.events.SC_SignUp(
  { filter: {}, fromBlock: "latest" },
  function (error, data) {
    if (error) {
      console.log(error);
    } else {
      console.log("Data: ", data);
    }
  }
);
