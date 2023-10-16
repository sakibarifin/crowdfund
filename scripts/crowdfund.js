const {ethers} = require("hardhat");

async function main() {

  const Crowdfunding = await ethers.deployContract("contracts/Crowdfunding2.sol:CrowdFunding2");

  await Crowdfunding.waitForDeployment();

  console.log("Crowdfunding deployed to:", Crowdfunding.target);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {                                                                                           
    console.error(error);
    process.exit(1);
  });