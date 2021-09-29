import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import "./App.css";
import waveportal from "./utils/WavePortal.json";

function App() {
  const [currentAccount, setCurrentAccount] = useState();
  const [totalWaves, setTotalWaves] = useState(0);
  const [buttonText, setButtonText] = useState("Donate $1");
  const contractAddress = "0x7b02c82f577c290ce6d27752c610201e77a2f200";
  const contractABI = waveportal.abi;

  const checkIfWalletIsConnected = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        console.log("Please make sure your Metamask is connected");
        return;
      } else {
        console.log("The wallet detail found is ", ethereum);
      }

      const accounts = await ethereum.request({ method: "eth_accounts" });

      if (accounts.length !== 0) {
        const account = accounts[0];
        console.log("Found an authorized account at: ", account);
        setCurrentAccount(account);
      } else {
        console.log("No authorized account found");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        console.log("Get MetaMask!");
        return;
      }

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      console.log("Connected account ", accounts[0]);
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error);
      return;
    }
  };

  const wave = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const wavePortalContract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );

        console.log(wavePortalContract);
        let count = await wavePortalContract.getTotalWaves();
        console.log("Total waves are ", count.toNumber(), " in number");

        const waveTxn = await wavePortalContract.wave();
        console.log("Mining...", waveTxn.hash);
        setButtonText("Donating...");

        await waveTxn.wait();
        console.log("Mined...", waveTxn.hash);
        setButtonText("you just donated $1");

        count = await wavePortalContract.getTotalWaves();
        console.log("Total waves are ", count.toNumber(), " in number");
        setTotalWaves(count.toNumber());
        setButtonText("Donate $1");
      } else {
        console.log("Ethereum object doesn't exist");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const renderTotalWaves = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const wavePortalContract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );

        console.log(wavePortalContract);
        let count = await wavePortalContract.getTotalWaves();
        console.log("Total waves are ", count.toNumber(), " in number");
        setTotalWaves(count.toNumber());
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    renderTotalWaves();
    checkIfWalletIsConnected();
  });

  return (
    <div className="mainContainer">
      <div className="dataContainer">
        <div className="header">Hi Satoshi!</div>

        <div className="bio">
          Life Hack: Save your happiness on blockchain so no one can change it
        </div>
        {!currentAccount ? (
          <button className="waveButton" onClick={connectWallet}>
            Connect Wallet
          </button>
        ) : (
          <button className="waveButton" onClick={wave}>
            {buttonText}
          </button>
        )}
        <h1 className="total">
          {"Awesom! we've got $" + totalWaves + " already in our wallet!"}
        </h1>
      </div>
    </div>
  );
}

export default App;
