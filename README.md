# truffle-wallet-connect-provider

WalletConnect provider for Truffle smart contract deployment.

Currently smart contract deployment's are commonly executed on the command line using a seed phrase that is either stored as an environment variable or local file. A better way to manage an account used to deploy smart contracts with truffle would be to remotely sign contract deployment transactions from a mobile device using WalletConnect. Instead of exposing the seed phrase or private key used for deployment on the same environment as the source code, we could instead initiate a WalletConnect session from a QR Code generate on the CLI to be scanned by a mobile wallet. After successful connection, a contract deployment transaction could be requested immediately after to the connected wallet.