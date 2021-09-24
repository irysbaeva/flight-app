import React, { useEffect, useState } from "react";
import "./App.css";
import flightsData from "./flights.json";
import SortingPanel from "./sorting-panel";
import FlightInfo from "./flight-info";

const App = () => {
  const [num, setNum] = useState(2);
  let { flights } = flightsData.result;
  const [data, setData] = useState(flights);
  const [viewData, setViewData] = useState();
  const showFlights = () => {
    setNum(num + 2);
  };

  const arr = [];
  data.map((el) => arr.push(el.flight.carrier.caption));

  const cheapestPrice = (airCompany) => {
    const prices = [];
    flights
      .filter((el) => el.flight.carrier.caption === airCompany)
      .map((el) => prices.push(el.flight.price.total.amount));
    return Math.min(...prices);
  };

  const airCompanies = [];
  arr
    .reduce((unique, item) => {
      return unique.includes(item) ? unique : [...unique, item];
    }, [])
    .map((el) =>
      airCompanies.push({ airCompany: el, price: cheapestPrice(el) })
    );

  useEffect(() => {
    setViewData(data.slice(0, num));
  }, [data, num]);
  useEffect(() => {
    setNum(2);
  }, [data]);

  return (
    <div className="App">
      <div className="sorting-panel">
        <SortingPanel
          airCompanies={airCompanies}
          data={data}
          resetData={()=>setData(flights)}
          setData={setData}
          num={num}
        />
      </div>
      <div className="search-results">
        <span> {viewData && viewData.map((el) => <FlightInfo el={el} />)}</span>
        <button className="btn-show-results" onClick={showFlights}>
          Показать еще
        </button>
      </div>
    </div>
  );
};

export default App;
