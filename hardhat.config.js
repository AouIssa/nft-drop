require("@nomicfoundation/hardhat-toolbox");
require("@nomicfoundation/hardhat-chai-matchers");
require("@nomiclabs/hardhat-ethers");
require('dotenv').config()

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  defaultNetwork: "hardhat",
  allowUnlimitedContractSize: true,
  networks: {
    hardhat: {
      // chainId: 137
    },

    mumbai: {
      url: "https://polygon-mumbai.g.alchemy.com/v2/ta5Pm_BXisnJonzmssws5Ljhhy-7xOXy",
      accounts:  [process.env.PRIVATE_KEY]
   },
    
    matic:{
      url: "https://polygon-mainnet.g.alchemy.com/v2/BBLOJSsyKQxpozCo3qzaEW-A2vVwtVC8",
      accounts:  [process.env.PRIVATE_KEY]
    },
    ropsten: { 
      url: "https://eth-goerli.g.alchemy.com/v2/t9CKXvTcR4FkkDSx-Z860wVTEUCthDbv",
      accounts:  process.env.API_KEY
     },
  },
  
  solidity: "0.8.17",
};
