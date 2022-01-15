import React, { useCallback, useEffect, useState } from "react";
import "./App.css";
import useSWR from "swr";

import { useWeb3React } from "@web3-react/core";
import { injected } from "./wallet/connector";
import detectEthereumProvider from "@metamask/detect-provider";
import { loadContract } from "./utils/loadContract";
import { fetcher } from "./utils/fetcher";
function App() {
  const { active, account, library, activate, deactivate, connector } =
    useWeb3React();
  const [accountEth, setAccountEth] = useState(null);
  const [contract, setContract] = useState({ contract: null });
  const [balance, setBalance] = useState(0);

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
    const getAccounts = async () => {
      const accounts = await library.eth.getAccounts();
      const provider_ = await detectEthereumProvider();
      const contract = await loadContract("Faucet", provider_);
      setContract({ contract });
      setAccountEth(accounts[0]);
      const balance = await library.eth.getBalance(accounts[0]);
      try {
        const weiToEther = library.utils.fromWei(balance, "ether");
        setBalance(weiToEther);
      } catch (error) {
        console.log(error);
      }
    };
    if (library && active) {
      getAccounts();
    }
  }, [library, active]);

  const addFunds = useCallback(async () => {
    try {
      const addFunds_ = await contract.contract.addFunds({
        from: account,
        value: library.utils.toWei("1", "ether"),
      });
    } catch (error) {
      console.log(error);
    }
  }, [contract]);

  const withDrawFunds = async () => {
    try {
      const withDraw_ = await contract.contract.withdraw({
        from: account,
        value: library.utils.toWei("1", "ether"),
      });
    } catch (error) {}
  };

  return (
    <div className="App">
      <div className="flex flex-row justify-start">
        <h1>Account: {active ? account : "not Connect"}</h1>
        <h1 className="font-semibold">
          Current Balance: {balance ? balance.toString() : ""}{" "}
        </h1>
      </div>
      <div className="flex flex-row justify-start">
        <button onClick={connect}>Enable Ethereum</button>
        <button onClick={addFunds}>Donate</button>
        <button onClick={withDrawFunds}>Withdraw</button>
      </div>
    </div>
  );
}

export default App;
