const abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "string",
        name: "id",
        type: "string",
      },
      {
        indexed: false,
        internalType: "address",
        name: "_account",
        type: "address",
      },
    ],
    name: "SC_SignUp",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "id",
        type: "string",
      },
    ],
    name: "signUp",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "students",
    outputs: [
      {
        internalType: "string",
        name: "_id",
        type: "string",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];
const addressSC = "0x33A870Cb8Cc05C06558634FAE7aCfa28ae01d7f9";

const webSocketInfura =
  "wss://rinkeby.infura.io/ws/v3/e51949d766e8499b9d7726a3d3dfee46";

module.exports = { abi, addressSC, webSocketInfura };
