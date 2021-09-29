require('@nomiclabs/hardhat-waffle');
require('dotenv').config();

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
 module.exports = {
  solidity: '0.8.0',
  networks: {
    rinkeby: {
      url: 'https://eth-rinkeby.alchemyapi.io/v2/lNNlHk8yhQN6BQPyh9c6td5a3lGAPZy9',
      accounts: ['705dbfcc23295737823034e3759499181cd27c3615d0e20ed524e96e68c23ba3'],
    },
  },
};

// module.exports = {
//   solidity: '0.8.0',
//   networks: {
//     rinkeby: {
//       url: process.env.STAGING_ALCHEMY_KEY,
//       accounts: [process.env.PRIVATE_KEY],
//     },
//     mainnet: {
//       chainId: 1,
//       url: process.env.PROD_ALCHEMY_KEY,
//       accounts: [process.env.PRIVATE_KEY],
//     },
//   },
// };