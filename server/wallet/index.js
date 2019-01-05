const APIError = require('../apiError');
const balance = require('../balance');

class Wallet {
  constructor() {
    this.holdings = new Map();
  }

  async encode() {
    const holdings = await Promise.all(Array.from(this.holdings.values()).map(holding => holding.encode())); 
    
    return {
      globalBalance: balance.amount,
      count: this.holdings.size,
      holdings: holdings
    };
  }

  installRoutes(router) {
    router.get('/api/wallet', async cxt => {
      cxt.body = await this.encode();
    });
  }
}

module.exports = new Wallet();
