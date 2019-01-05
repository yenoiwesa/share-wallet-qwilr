const APIError = require('../apiError');
const { IEXClient } = require('iex-api');
require('isomorphic-fetch');

const iex = new IEXClient(fetch)

class Share {
  constructor() {
  }

  async getRealTimePrice(ticker) {
    const result = await iex.stockPrice(ticker);
    console.log(ticker, result);
    if (isNaN(result)) {
      throw new APIError(result, 400);
    }
    return result;
  };

  async getQuote(ticker) {
    const result = iex.stockQuote(ticker);
    return result;
  }

  async encode(ticker) {
    return await this.getQuote(ticker);
  }

  installRoutes(router) {
    router.get('/api/share/:ticker', async cxt => {
      cxt.body = await this.encode(cxt.params.ticker);
    });
  }
}

module.exports = new Share();
