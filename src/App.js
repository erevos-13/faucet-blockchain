import React, { useEffect, useState } from "react";
import "./App.css";

import { useWeb3React } from "@web3-react/core";
import { injected } from "./wallet/connector";
import detectEthereumProvider from "@metamask/detect-provider";
import { loadContract } from "./utils/loadContract";
function App() {
  const { active, account, library, activate, deactivate } = useWeb3React();
  const [accountEth, setAccountEth] = useState(null);
  const [balance, setBalance] = useState(null);
  const [contract, setContract] = useState({contract: null});

  async function connect() {
    try {
      console.log('connect', { active, account, library, activate, deactivate })
      await activate(injected);
    } catch (ex) {
      console.log(ex);
    }
  }

  useEffect(() => {
    const loadProvider = () => {
      console.log(window.web3);
      console.log(window.ethereum);
      if (window.ethereum) {
        connect();
      }
    };
    loadProvider();
  }, []);

  useEffect(() => {
    const getAccounts = async () => {
      const accounts = await library.eth.getAccounts();
      const contract = await loadContract("Faucet");
      setContract({contract});
      setAccountEth(accounts[0]);
    };
    if (library && active) {
      getAccounts();
    }
  }, [library, active]);

  return (
    <div className="App">
      <div className="flex flex-row justify-start">
        <h1>Account: {active ? account : "not Connect"}</h1>
        <h1 className="font-semibold">Current Balance: {balance} </h1>
      </div>
      <div className="flex flex-row justify-start">
        <button onClick={connect}>Enable Ethereum</button>
        <button>Donate</button>
        <button>Withdraw</button>
      </div>
    </div>
  );
}

export default App;
