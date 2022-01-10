import React, { useEffect, useState } from "react";
import "./App.css";

import { useWeb3React } from "@web3-react/core";
import { injected } from "./wallet/connector";
import detectEthereumProvider from "@metamask/detect-provider";
function App() {
  const { active, account, library, activate, deactivate } = useWeb3React();
  const [accountEth, setAccountEth] = useState(null);
  console.log({ active, account, library, activate, deactivate });
  async function connect() {
    try {
      await activate(injected);
    } catch (ex) {
      console.log(ex);
    }
  }

  useEffect(() => {
    const provider = await detectEthereumProvider();
    const loadProvider = () => {
      console.log(window.web3);
      console.log(window.ethereum);
      if (window.ethereum) {
        connect();
      }
    };
    if (provider) {
      console.log("Ethereum successfully detected!");

      loadProvider();
    } else {
      // if the provider is not detected, detectEthereumProvider resolves to null
      console.error("Please install MetaMask!", error);
    }
  }, []);

  useEffect(() => {
    const getAccounts = async () => {
      const accounts = await library.eth.getAccounts();
      setAccountEth(accounts[0]);
    };
    if (library) {
      getAccounts();
    }
  }, [library]);

  return (
    <div className="App">
      <div className="flex flex-row justify-start">
        <h1>Account: {accountEth ? accountEth : "not Connect"}</h1>
        <h1 className="font-semibold">Current Balance:</h1>
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
