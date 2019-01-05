import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';

import WalletService from '../services/wallet.service';

class BuyShareAction extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      ticker: props.ticker || '',
      quantity: 1,
      error: null
    };

    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.handleTickerChange = this.handleTickerChange.bind(this);
    this.handleQuantityChange = this.handleQuantityChange.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleClickOpen() {
    this.setState({ open: true });
  }

  handleTickerChange(event) {
    this.setState({ ticker: event.target.value });
  }

  handleQuantityChange(event) {
    this.setState({ quantity: event.target.value });
  }

  handleClose() {
    this.setState({ open: false, value: 0, error: null });
  }

  async handleSubmit() {
    if (!this.state.ticker) {
      this.setState({ error: 'You must enter the ticker of the share to buy.' });
      return;
    }

    if (!this.state.quantity) {
      this.setState({ error: 'You must enter the quantity of shares to buy.' });
      return;
    }

    this.setState({ error: null });

    try {
      await WalletService.buy(this.state.ticker, this.state.quantity);
    } catch (error) {
      this.setState({ error });
      return;
    }
    this.handleClose();
  }

  render() {
    let error;
    if (this.state.error) {
      error = (
        <div role="alert" className="u-error">
          {this.state.error}
        </div>
      );
    }

    return (
      <div className="BuyShareAction">
        <Button variant="outlined" color="secondary" onClick={this.handleClickOpen}>
          Buy shares
        </Button>

        <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Buy shares</DialogTitle>
          <DialogContent>
            {error}

            <DialogContentText>Enter the ticker and the quantity of the share you wish to buy.</DialogContentText>

            <TextField
              autoFocus
              label="Ticker"
              value={this.state.ticker}
              onChange={this.handleTickerChange}
              type="text"
              margin="dense"
              fullWidth
              required
            />
            <TextField
              label="Quantity"
              value={this.state.quantity}
              onChange={this.handleQuantityChange}
              type="number"
              margin="dense"
              fullWidth
              required
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose}>Cancel</Button>
            <Button onClick={this.handleSubmit} color="primary">
              Buy share
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default BuyShareAction;
