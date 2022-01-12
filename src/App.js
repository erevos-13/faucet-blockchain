import React, { useEffect, useState } from "react";
import "./App.css";
import useSWR from 'swr'

import { useWeb3React } from "@web3-react/core";
import { injected } from "./wallet/connector";
import detectEthereumProvider from "@metamask/detect-provider";
import { loadContract } from "./utils/loadContract";
import { fetcher } from "./utils/fetcher";
function App() {
  const { active, account, library, activate, deactivate, connector } =
    useWeb3React();
    const { data: balance } = useSWR(['getBalance', account, 'latest'], {
      fetcher: fetcher(library),
    })
  const [accountEth, setAccountEth] = useState(null);
  const [contract, setContract] = useState({ contract: null });

  async function connect() {
    try {
      await activate(injected);
      console.log("connect", {
        active,
        account,
        library,
        activate,
        deactivate,
        connector,
      });

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
      const provider_ = await detectEthereumProvider();
      const contract = await loadContract("Faucet", provider_);
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
        <h1 className="font-semibold">Current Balance: { (balance) ? balance.toString() : ''} </h1>
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
