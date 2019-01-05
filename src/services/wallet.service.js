import { Subject } from 'rxjs';

import BalanceService from './balance.service';

class Wallet extends Subject {
  constructor() {
    super();
    this.initPromise = null;
  }

  init() {
    if (!this.initPromise) {
      this.initPromise = this.refresh();
    }

    return this.initPromise;
  }

  async buy(ticker, quantity) {
    const response = await fetch('/api/share/buy', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ ticker, quantity })
    });
    BalanceService.refresh();
    return this.handleResponse(response);
  }

  async sell(ticker, quantity) {
    const response = await fetch('/api/share/sell', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ ticker, quantity })
    });
    BalanceService.refresh();
    return this.handleResponse(response);
  }

  async refresh() {
    const response = await fetch('/api/wallet');
    return this.handleResponse(response);
  }

  async handleResponse(response) {
    let data;
    try {
      data = await response.json();
      if (data.error) {
        throw data.error;
      }
    } catch (error) {
      throw error || 'An unknown error has occured';
    }
    this.next(data);
  }
}

const singleton = new Wallet();
export default singleton;
