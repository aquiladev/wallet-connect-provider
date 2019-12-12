const Connector = require('@walletconnect/core').default

const crypto = require('./crypto')

class WalletConnect extends Connector {
  constructor (opts) {
    super(crypto, opts)
  }
}

module.exports = WalletConnect
