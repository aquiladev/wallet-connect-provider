const ProviderEngine = require("web3-provider-engine");
const FiltersSubprovider = require("web3-provider-engine/subproviders/filters");
const RpcSubprovider = require("web3-provider-engine/subproviders/rpc");
const NonceSubprovider = require("web3-provider-engine/subproviders/nonce-tracker");
const WalletConnectSubprovider = require("./subprovider");

function WalletConnectProvider(bridgeUrl, providerUrl) {
  if (!bridgeUrl) {
    throw new Error(`Bridge URL missing, non-empty string expected, got "${bridgeUrl}"`);
  }

  if (!providerUrl) {
    throw new Error(`Provider URL missing, non-empty string expected, got "${providerUrl}"`);
  }

  this.engine = new ProviderEngine();

  this.engine.addProvider(new FiltersSubprovider());
  this.engine.addProvider(new NonceSubprovider());
  this.engine.addProvider(new WalletConnectSubprovider({ bridge: bridgeUrl }));
  this.engine.addProvider(new RpcSubprovider({ rpcUrl: providerUrl }));

  this.engine.start();
}

WalletConnectProvider.prototype.sendAsync = function () {
  this.engine.sendAsync.apply(this.engine, arguments);
};

WalletConnectProvider.prototype.send = function () {
  return this.engine.send.apply(this.engine, arguments);
};

module.exports = WalletConnectProvider;