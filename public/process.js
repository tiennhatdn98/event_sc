$(document).ready(function () {
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

  const WEB_SOCKET_INFURA =
    "wss://rinkeby.infura.io/ws/v3/e51949d766e8499b9d7726a3d3dfee46";

  const web3 = new Web3(window.ethereum);
  window.ethereum.enable();

  // Create contract on Metamask
  const contractMetamask = new web3.eth.Contract(abi, addressSC);
  console.log(contractMetamask);

  // Create contract on Infura
  const provider = new Web3.providers.WebsocketProvider(WEB_SOCKET_INFURA);
  const web3Infura = new Web3(provider);
  const contractInfura = new web3Infura.eth.Contract(abi, addressSC);
  console.log(contractInfura);
  // contractInfura.events.SC_SignUp().on("data", (event) => {
  //   console.log(event);
  // });

  // Listen event SC_SignUp on Minigame contract
  // contractInfura.events.SC_SignUp(
  //   { filter: {}, fromBlock: "latest" },
  //   function (error, data) {
  //     if (error) {
  //       console.log(error);
  //     } else {
  //       console.log(data);
  //       $(".info").append(
  //         `<tr>
  //           <td>${data.returnValues[0]}</td>
  //           <td>${data.returnValues[1]}</td>
  //         </tr>`
  //       );
  //     }
  //   }
  // );

  let currentAccount = "";
  checkMetamask();

  $("#btnSignUp").click(function () {
    if (!currentAccount.length) {
      alert("Please connect to Metamask!");
    } else {
      $.post(
        "/signup",
        {
          name: $("#name").val(),
          email: $("#email").val(),
          age: $("#age").val(),
        },
        function (data) {
          console.log("Data: ", data);
          if (data?._id) {
            contractMetamask.methods.signUp(data._id).send({
              from: currentAccount,
            });
          }
        }
      );
    }
  });

  $("#btnConnectMM").click(async function () {
    try {
      currentAccount = await connectMetamask();
      console.log(currentAccount);
    } catch (error) {
      console.log(error);
    }
  });

  ethereum.on("accountsChanged", function (accounts) {
    // Time to reload your interface with accounts[0]!
    currentAccount = accounts[0];
    console.log(currentAccount);
  });
});

async function connectMetamask() {
  const accounts = await ethereum.request({ method: "eth_requestAccounts" });
  return accounts[0];
}

function checkMetamask() {
  if (typeof window.ethereum !== "undefined") {
    console.log("MetaMask is installed!");
    return true;
  } else {
    console.log("MetaMask isn't installed!");
    return false;
  }
}
