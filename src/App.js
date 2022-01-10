import React,{ useEffect } from "react";
import "./App.css";

import { useWeb3React } from "@web3-react/core";
import { injected } from "./wallet/connector";
function App() {
  const { active, account, library, activate,deactivate } = useWeb3React();

  async function connect() {
    try {
      await activate(injected);
    } catch (ex) {
      console.log(ex)
    }
  }

  useEffect(() => {
    const loadProvider = () => {
      console.log(window.web3);
      console.log(window.ethereum);
    };
    loadProvider();
  }, []);

  return (
    <div className="App">
      <div className="flex flex-row justify-start">
        <h1 className="font-semibold">Current Balance: 10 ETH</h1>
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
