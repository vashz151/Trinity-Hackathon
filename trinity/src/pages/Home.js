import React from "react";
import Button from "@mui/material/Button";
import Web3 from "web3";
import Ballot from "../truffle_abis/Ballot.json";
import { useNavigate } from "react-router-dom";
function Home() {
  const navigate = useNavigate();
  const loadBlockchainData = async () => {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    console.log("accounts: ", accounts);
    let balance = await window.ethereum.request({
      method: "eth_getBalance",
      params: [accounts[0], "latest"],
    });
    balance = window.web3.utils.fromWei(balance, "ether");
    console.log("balance: ", balance);
    const networkId = await window.web3.eth.net.getId();
    const networkData = Ballot.networks[networkId];
    console.log("networkData: ", networkData);
    if (networkData) {
      const ballot = new window.web3.eth.Contract(
        Ballot.abi,
        networkData.address
      );
      console.log("ballot: ", ballot);
      // get owner
      const owner = await ballot.methods.owner().call();
      console.log("owner: ", owner.toUpperCase());
      localStorage.setItem("balance", balance);
      if (owner.toUpperCase() === accounts[0].toUpperCase()) {
        console.log("ownerdfafs: ", owner);
        localStorage.setItem("type", "owner");
        localStorage.setItem("id", owner);
        navigate("/dashboard/app");
      } else {
        localStorage.setItem("type", "user");
        localStorage.setItem("id", accounts[0]);
        navigate("/dashboard/app");
      }
    }
  };

  const loadWeb3 = async () => {
    // check if account is connected
    if (window.ethereum.selectedAddress) {
      loadBlockchainData();
      return;
    }

    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
      loadBlockchainData();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert("No ethereum browser detected!");
    }
  };

  return (
    <div>
      <Button variant="contained" onClick={loadWeb3}>
        Connect to Wallet
      </Button>
    </div>
  );
}

export default Home;
