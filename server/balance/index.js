const APIError = require('../apiError');

class Balance {
  constructor() {
    this.amount = 0;
  }

  add(value) {
    this.amount += value;
  }

  withdraw(value) {
    if (value > this.amount) {
      throw new APIError('Funds insufficient', 401);
    }
    this.amount -= value;
  }

  encode() {
    return {
      amount: this.amount
    };
  }

  installRoutes(router) {
    router.get('/api/balance', cxt => {
      cxt.body = this.encode();
    });

    router.put('/api/balance/add', cxt => {
      // retrieve amount added
      const value = Number(cxt.request.body.value);

      if (isNaN(value)) {
        throw new APIError('Value must be a number', 400);
      }

      this.add(value);

      cxt.body = this.encode();
    });

    router.put('/api/balance/withdraw', cxt => {
      // retrieve amount withdrawn
      const value = Number(cxt.request.body.value);

      if (isNaN(value)) {
        throw new APIError('Value must be a number', 400);
      }

      this.withdraw(value);

      cxt.body = this.encode();
    });
  }
}

module.exports = new Balance();
