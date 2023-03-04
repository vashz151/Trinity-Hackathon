import React from "react";
import Button from "@mui/material/Button";
import Web3 from "web3";
import Ballot from "../truffle_abis/Ballot.json";

function Home() {

  const loadBlockchainData = async () => {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
    console.log("accounts: ", accounts);
    let balance = await window.ethereum.request({ method: 'eth_getBalance', params: [accounts[0], "latest"] });
    console.log("balanceeee: ", balance);
    balance = window.web3.utils.fromWei(balance, "ether");
    console.log("balance: ", balance);
    // check if accounts[0] is connected to the network
    const networkId = await window.web3.eth.net.getId();
    const networkData = Ballot.networks[networkId];
    console.log("networkData: ", networkData);
    if (networkData) {
      const ballot = new window.web3.eth.Contract(Ballot.abi, networkData.address);
      const owner = await ballot.methods.owner().call();
      if(owner.toUpperCase() === accounts[0].toUpperCase()){
        console.log("owner: ", owner);
    }
  }
  }

  const loadWeb3 = async () => {
    // check if account is connected
    if(window.ethereum.selectedAddress){
      loadBlockchainData();
      return;
    }

    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
      loadBlockchainData();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    }else{
      window.alert("No ethereum browser detected!")
    }
  }

  return <div>
    <Button variant="contained" onClick={loadWeb3}>Connect to Wallet</Button>
  </div>;
}

export default Home;
