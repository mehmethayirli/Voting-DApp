import React, { useState } from "react";
import { ethers } from "ethers";
import Login from "./Components/Login";
import "./App.css";

function App() {
  const [provider, setProvider] = useState(null);
  const [account, setAccount] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  async function connectToMetamask() {
    if (window.ethereum) {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        setProvider(provider);
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        setAccount(address);
        console.log("Metamask Connected : " + address);
        setIsConnected(true);
      } catch (err) {
        console.error(err);
      }
    } else {
      console.error("Tarayıcıda Metamask algılanamadı");
    }
  }

  return (
    <div className="App">
      <Login connectWallet={connectToMetamask} />
    </div>
  );
}

export default App;
