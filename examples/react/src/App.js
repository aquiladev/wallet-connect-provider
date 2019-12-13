import React, { useState } from 'react';
import Web3 from 'web3';

import WalletConnectProvider from './../../../';
import logo from './logo.svg';
import './App.css';

function App () {
  const [account, setAccount] = useState();

  const connect = () => {
    const provider = new WalletConnectProvider({
      rpcUrl: "http://localhost:7545"
    });
    const web3 = new Web3(provider);
    web3.eth.getAccounts()
      .then(x => {
        setAccount(x)
      });
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {
          account ?
            <p>{account}</p> :
            <button onClick={connect}>Connect Wallet</button>
        }
      </header>
    </div>
  );
}

export default App;
