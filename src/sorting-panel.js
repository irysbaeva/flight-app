import React from "react";
import "./sorting-panel.css";

const SortingPanel = ({ airCompanies, data, setData, resetData }) => {
  const sortByCheapestPrice = () => {
    data.sort(
      (a, b) => a.flight.price.total.amount - b.flight.price.total.amount
    );
    setData(data);
  };

  const sortByExpensivePrice = () => {
    data.sort(
      (a, b) => b.flight.price.total.amount - a.flight.price.total.amount
    );
    setData(data);
  };

  const sortByDuration = () => {
    data.sort(
      (a, b) =>
        a.flight.legs[0].duration +
        a.flight.legs[1].duration -
        (b.flight.legs[0].duration + b.flight.legs[1].duration)
    );
    setData(data);
  };

  const filterByStops = (value) => {
    if (value === "stop") {
      data = data.filter(
        (el) =>
          el.flight.legs[0].segments.length === 2 &&
          el.flight.legs[1].segments.length === 2
      );
    } else if (value === "direct") {
      data = data.filter(
        (el) =>
          el.flight.legs[0].segments.length === 1 &&
          el.flight.legs[1].segments.length === 1
      );
    }
    setData(data);
  };

  return (
    <div className="sorting">
      <p>Сортировать</p>
      <input
        onChange={sortByCheapestPrice}
        type="radio"
        id="cheapest"
        name="sorting"
        value="cheapest"
      />
      <label htmlFor="cheapest">по возрастанию цены</label>
      <br />
      <input
        onChange={sortByExpensivePrice}
        type="radio"
        id="expensive"
        name="sorting"
        value="expensive"
      />
      <label htmlFor="expensive">по убыванию цены</label>
      <br />
      <input
        onChange={sortByDuration}
        type="radio"
        id="duration"
        name="sorting"
        value="duration"
      />
      <label htmlFor="duration">по времени в пути</label>
      <p>Фильтровать</p>
      <input
        onChange={(e) => filterByStops(e.target.value)}
        type="checkbox"
        id="stop"
        value="stop"
      />
      <label htmlFor="stop">1 пересадка</label> <br />
      <input
        onChange={(e) => filterByStops(e.target.value)}
        type="checkbox"
        id="direct"
        value="direct"
      />
      <label htmlFor="direct">без пересадок</label>
      <br />
      <p>Цена</p>
      От <input />
      <br />
      До <input />
      <br />
      <p>Авиакомпании</p>
      {airCompanies.map((el) => {
        return (
          <div key={el.airCompany}>
            <input type="checkbox" /> {el.airCompany} <br /> от {el.price} руб.
          </div>
        );
      })}
    </div>
  );
};

export default SortingPanel;
