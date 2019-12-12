# truffle-wallet-connect-provider

WalletConnect provider for Truffle smart contract deployment.

Currently smart contract deployment's are commonly executed on the command line using a seed phrase that is either stored as an environment variable or local file. A better way to manage an account used to deploy smart contracts with truffle would be to remotely sign contract deployment transactions from a mobile device using WalletConnect. Instead of exposing the seed phrase or private key used for deployment on the same environment as the source code, we could instead initiate a WalletConnect session from a QR Code generate on the CLI to be scanned by a mobile wallet. After successful connection, a contract deployment transaction could be requested immediately after to the connected wallet.

## Getting start

You need to install npm package
```
npm i https://github.com/aquiladev/truffle-wallet-connect-provider
```

Then you need to setup `truffle-config.js`

```
const WalletConnectProvider = require("truffle-wallet-connect-provider");

module.exports = {
    networks: {
        rinkeby: {
            provider:
                new WalletConnectProvider({
                    rpcUrl: "https://rinkeby.infura.io/v3/" + process.env.INFURA_API_KEY
                }),
            network_id: 4
        }
    }
}
```

## WalletConnectProvider options
```
{
    bridge: "https://bridge.walletconnect.org"      // wallet-connect bridge (default: https://bridge.walletconnect.org)
    rpcUrl: "http://localhost:8545"                 // RPC url (Required)
}
```

## Try it
In order to use, you need to have a mobile wallet with WalletConnect support. 
For testing purpose, you can use https://test.walletconnect.org/

You need:
1. open `test.walletconnect.org` on a mobile phone (Safari in case of iOS)
2. run `truffle migrate --network rikneby` in your project
3. connect `test.walletconnect.org` via scanning QR code in a console
4. approve `truffle-wallet-connect-provider` in `test.walletconnect.org`
5. sign a transaction in `test.walletconnect.org` when the request appears