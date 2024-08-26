import React from 'react';
import './index.css';

class StockTrade extends React.Component {
  state = {
    symbol: '',
    shares: 0,
    action: 'buy',
  };

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleTrade = () => {
    const { symbol, shares, action } = this.state;
    const { onTrade } = this.props;

    const sharesNumber = parseInt(shares, 10);

    if (symbol && sharesNumber > 0) {
      onTrade(symbol.toUpperCase(), sharesNumber, action);
    }
  };

  render() {
    const { symbol, shares, action } = this.state;

    return (
      <div className="stock-trade">
        <h2>Trade Stocks</h2>
        <label>
          Symbol:
          <input
            type="text"
            name="symbol"
            value={symbol}
            onChange={this.handleInputChange}
          />
        </label>
        <br />
        <label>
          Shares:
          <input
            type="number"
            name="shares"
            value={shares}
            onChange={this.handleInputChange}
          />
        </label>
        <br />
        <label>
          Action:
          <select name="action" value={action} onChange={this.handleInputChange}>
            <option value="buy">Buy</option>
            <option value="sell">Sell</option>
          </select>
        </label>
        <br />
        <button onClick={this.handleTrade}>Execute Trade</button>
      </div>
    );
  }
}

export default StockTrade;
