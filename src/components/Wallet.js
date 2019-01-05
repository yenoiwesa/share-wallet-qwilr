import React, { Component } from 'react';

import './Wallet.css';
import { formatCurrency } from '../formatters';
import WalletService from '../services/wallet.service';
import BuyShareAction from './BuyShareAction';

class Wallet extends Component {
  constructor(props) {
    super(props);

    this.state = {
      wallet: null
    };

    this.observer = WalletService.subscribe(wallet => {
      this.setState({ wallet });
    });
    WalletService.init();
  }

  componentWillUnmount() {
    this.observer.unsubscribe();
  }

  render() {
    if (!this.state.wallet) {
      return <div className="Wallet" />;
    }

    return (
      <div className="Wallet">
        <div className="Wallet-details">
          <h2 className="Wallet-title">Holdings</h2>
          <div className="Wallet-subtitle">Total net worth</div>
          <div className="Wallet-value">$ {formatCurrency(this.state.wallet.total)}</div>
        </div>

        <div className="Wallet-actions">
          <BuyShareAction />
        </div>
      </div>
    );
  }
}

export default Wallet;
