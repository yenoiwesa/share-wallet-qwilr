const APIError = require('../apiError');

const precision = 2;

class Balance {
  constructor() {
    this.amount = 0;
  }

  add(value) {
    this.amount = Number((this.amount + value).toFixed(precision));
  }

  withdraw(value) {
    if (value > this.amount) {
      throw new APIError('Funds insufficient', 401);
    }
    this.amount = Number((this.amount - value).toFixed(precision));
  }

  encode() {
    return {
      amount: this.amount
    };
  }

  validate(value) {
    if (isNaN(value)) {
      throw new APIError('Value must be a number', 400);
    }
    if (value < 0) {
      throw new APIError('Value must be positive', 400);
    }
    if (value.toFixed(precision + 1) != value.toFixed(precision) + '0') {
      throw new APIError('Precision is not supported', 400);
    }
  }

  installRoutes(router) {
    router.get('/api/balance', cxt => {
      cxt.body = this.encode();
    });

    router.put('/api/balance/add', cxt => {
      // retrieve amount added
      const value = Number(cxt.request.body.value);

      this.validate(value);

      this.add(value);

      cxt.body = this.encode();
    });

    router.put('/api/balance/withdraw', cxt => {
      // retrieve amount withdrawn
      const value = Number(cxt.request.body.value);

      this.validate(value);

      this.withdraw(value);

      cxt.body = this.encode();
    });
  }
}

module.exports = new Balance();
