import React from 'react';
import StockDashboard from './Components/StockDashboard';
import StockTrade from './Components/StockTrade';
import StockData from './Components/StockData';
import './App.css';

class App extends React.Component {
  state = {
    holdings: [
      { symbol: 'AAPL', shares: 10 },
      { symbol: 'GOOGL', shares: 5 },
      { symbol: 'MSFT', shares: 15 },
    ],
  };

  handleTrade = (symbol, shares, action) => {
    this.setState((prevState) => {
      const existingHolding = prevState.holdings.find(
        (holding) => holding.symbol === symbol
      );

      if (existingHolding) {
        const updatedShares =
          action === 'buy'
            ? existingHolding.shares + shares
            : Math.max(existingHolding.shares - shares, 0);

        return {
          holdings: prevState.holdings.map((holding) =>
            holding.symbol === symbol
              ? { ...holding, shares: updatedShares }
              : holding
          ),
        };
      } else if (action === 'buy') {
        return {
          holdings: [...prevState.holdings, { symbol, shares }],
        };
      }
    });
  };

  render() {
    const { holdings } = this.state;

    return (
      <>
        <div className="container">
          <h1>Real-Time Stock Market App</h1>
          <StockDashboard holdings={holdings} />
          <StockTrade onTrade={this.handleTrade} />
        </div>
        <StockData />
      </>
    );
  }
}

export default App;
