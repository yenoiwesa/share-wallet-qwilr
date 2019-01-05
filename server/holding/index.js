const APIError = require('../apiError');
const balance = require('../balance');
const share = require('../share');

class Holding {
  constructor(ticker) {
    this.quantity = 0;
    this.ticker = ticker;
  }

  async buy(qty) {
    const price = await share.getRealTimePrice(this.ticker);
    balance.withdraw(qty * price); 
    this.quantity += qty;
  }

  async sell(qty) {
    if (qty > this.quantity) {
      throw new APIError('Not enough share', 401);
    }
    const price = await share.getRealTimePrice(this.ticker);
    this.quantity -= qty;
    balance.add(qty * price); // TODO: price round up (here or in balance)
  }

  async encode() {
    const price = await share.getRealTimePrice(this.ticker);
    return {
      ticker: this.ticker,
      quantity: this.quantity,
      shareValue: price,
      holdingValue: this.quantity * price
    };
  }
  
  isEmpty() {
      return !this.quantity;
  }
}

module.exports = Holding;
