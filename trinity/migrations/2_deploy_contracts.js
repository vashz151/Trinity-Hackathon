const Ballot = artifacts.require("Ballot");

module.exports = async function (deployer) {
  deployer.deploy(Ballot);
}
