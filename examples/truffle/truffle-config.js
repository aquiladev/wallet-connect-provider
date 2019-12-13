const WalletConnectProvider = require('./../../')

module.exports = {
  // Uncommenting the defaults below
  // provides for an easier quick-start with Ganache.
  // You can also follow this format for other networks;
  // see <http://truffleframework.com/docs/advanced/configuration>
  // for more details on how to specify configuration options!
  //
  networks: {
    development: {
      host: '127.0.0.1',
      port: 7545,
      network_id: '*'
    },
    // test: {
    //   host: '127.0.0.1',
    //   port: 7545,
    //   network_id: '*'
    // },
    rinkeby: {
      provider:
        new WalletConnectProvider({
          rpcUrl: 'https://rinkeby.infura.io/v3/' + process.env.INFURA_API_KEY
        }),
      network_id: 4
    }
  }
}
