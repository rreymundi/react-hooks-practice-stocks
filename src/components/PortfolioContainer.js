import React from "react";
import Stock from "./Stock";

function PortfolioContainer({stocks, onDeleteStock}) {

  const renderedPortfolio = stocks.map((stock) => <Stock key={stock.id} stock={stock} onStockClick={onDeleteStock}/>)

  return (
    <div>
      <h2>My Portfolio</h2>
      {renderedPortfolio}
    </div>
  );
}

export default PortfolioContainer;
