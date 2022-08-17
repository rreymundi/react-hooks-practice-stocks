import React, {useState, useEffect} from "react";
import StockContainer from "./StockContainer";
import PortfolioContainer from "./PortfolioContainer";
import SearchBar from "./SearchBar";

function MainContainer() {
  const [stocks, setStock] = useState([])
  const [portfolio, setPortfolio] = useState([])
  const [sortBy, setSortBy] = useState("Alphabetically")
  const [filterBy, setFilter] = useState("Tech")

  useEffect(() => {
    fetch("http://localhost:3001/stocks")
    .then((r) => r.json())
    .then((data) => setStock(data))
  }, [])

  function handleAddStock(savedStock) {
    const portfolioStock = portfolio.find((stock) => stock.id === savedStock.id)
    if (!portfolioStock) {
      setPortfolio([...portfolio, savedStock])
    }
  }

  function handleSellStock(soldStock) {
    setPortfolio((portfolio) =>
      portfolio.filter((stock) => stock.id !== soldStock.id)
    );
  }

  const sortedStocks = [...stocks].sort((stock1, stock2) => {
    if (sortBy === "Alphabetically") {
      return stock1.name.localeCompare(stock2.name)
    } else {
      return stock1.price - stock2.price
    }
  })

  const filteredStocks = sortedStocks.filter((stock) => stock.type === filterBy)

  return (
    <div>
      <SearchBar sortBy={sortBy} setSortBy={setSortBy} filterBy={filterBy} setFilter={setFilter} />
      <div className="row">
        <div className="col-8">
          <StockContainer stocks={filteredStocks} onAddStock={handleAddStock} />
        </div>
        <div className="col-4">
          <PortfolioContainer stocks={portfolio} onDeleteStock={handleSellStock}/>
        </div>
      </div>
    </div>
  );
}

export default MainContainer;
