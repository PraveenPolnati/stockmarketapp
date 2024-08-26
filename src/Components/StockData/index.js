import { Component } from "react";
import './index.css';

class StockData extends Component {
    state = {
        symbol: 'IBM', 
        interval: '5min', 
        stockData: null,
        loading: false,
        error: null,
    };

    componentDidMount() {
        this.fetchStockData();
    }

    handleSymbolChange = (event) => {
        this.setState({ symbol: event.target.value });
    };

    handleIntervalChange = (event) => {
        this.setState({ interval: event.target.value });
    };

    handleSearch = () => {
        this.fetchStockData();
    };

    fetchStockData = () => {
        const { symbol, interval } = this.state;
        const apiKey = 'HI0TS35JICRDLM28';
        const url = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=${interval}&apikey=${apiKey}`;

        this.setState({ loading: true, stockData: null, error: null });

        fetch(url)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Network response was not ok.');
                }
            })
            .then((data) => {
                console.log('Fetched data:', data);
                this.setState({ stockData: data, loading: false });
            })
            .catch((error) => {
                console.error('There was a problem with the fetch operation:', error);
                this.setState({ error: error.message, loading: false });
            });
    };

    renderMetaData = () => {
        const { stockData } = this.state;
        if (!stockData || !stockData["Meta Data"]) return null;

        return (
            <div className="card-container">
                {Object.entries(stockData["Meta Data"]).map(([key, value]) => (
                    <div key={key} className="card">
                        <h3>{key.replace(/\d+\.\s*/, '')}</h3>
                        <p>{value}</p>
                    </div>
                ))}
            </div>
        );
    };

    renderStockData = () => {
        const { stockData } = this.state;
        if (!stockData || !stockData["Time Series (1min)"]) return null;

        return (
            <div className="card-container">
                {Object.entries(stockData["Time Series (1min)"]).map(([time, data]) => (
                    <div key={time} className="card">
                        <h3>{time}</h3>
                        <p>Open: {data["1. open"]}</p>
                        <p>High: {data["2. high"]}</p>
                        <p>Low: {data["3. low"]}</p>
                        <p>Close: {data["4. close"]}</p>
                        <p>Volume: {data["5. volume"]}</p>
                    </div>
                ))}
            </div>
        );
    };

    render() {
        const { symbol, interval, stockData, loading, error } = this.state;

        return (
            <div className="stockDataHome">
                <h2>Stock Data</h2>
                <div className="search-controls">
                    <input
                        type="text"
                        value={symbol}
                        onChange={this.handleSymbolChange}
                        placeholder="Enter stock symbol"
                    />
                    <select
                        value={interval}
                        onChange={this.handleIntervalChange}
                    >
                        <option value="1min">1 Minute</option>
                        <option value="5min">5 Minutes</option>
                        <option value="15min">15 Minutes</option>
                        <option value="30min">30 Minutes</option>
                        <option value="60min">1 Hour</option>
                    </select>
                    <button onClick={this.handleSearch}>Search</button>
                </div>
                {loading && <p className="loading">Loading stock data...</p>}
                {error && <p className="error">Error: {error}</p>}
                {stockData && !loading && !error && (
                    <>
                        {this.renderMetaData()}
                        {this.renderStockData()}
                    </>
                )}
            </div>
        );
    }
}

export default StockData;
