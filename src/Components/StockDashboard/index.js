import React from 'react';
import './index.css';

class StockDashboard extends React.Component {
  render() {
    const { holdings } = this.props;

    return (
      <div className="stock-dashboard">
        <h2>Your Holdings</h2>
        <ul>
          {holdings.map((holding, index) => (
            <li key={index}>
              {holding.symbol}: {holding.shares} shares
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default StockDashboard;
