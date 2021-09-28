import React, { useState, useEffect } from "react";
import "./sorting-panel.css";

const SortingPanel = ({ airCompanies, data, setData, resetData }) => {
  const [state, setState] = useState({
    filtredData: data,
    sorting: "",
    stops: "all",
    priceStart: "",
    priceEnd: "",
  });

  const handleChange = ({ target: { name, value } }) => {
    setState((prev) => ({ ...prev, [name]: value }));
  };
  useEffect(() => {
    let filtredData = [...state.filtredData];
    if (state.stops && state.stops === "direct") {
      filtredData = filtredData.filter(
        (el) =>
          el.flight.legs[0].segments.length === 1 &&
          el.flight.legs[1].segments.length === 1
      );
    }
    if (state.stops && state.stops === "stop") {
      filtredData = filtredData.filter(
        (el) =>
          el.flight.legs[0].segments.length === 2 &&
          el.flight.legs[1].segments.length === 2
      );
    }
    if (state.sorting === "cheapest") {
      filtredData.sort(
        (a, b) => a.flight.price.total.amount - b.flight.price.total.amount
      );
    }
    if (state.sorting === "expensive") {
      filtredData.sort(
        (a, b) => b.flight.price.total.amount - a.flight.price.total.amount
      );
    }
    if (state.sorting === "duration") {
   
      filtredData.sort(
        (a, b) =>
          a.flight.legs[0].duration +
          a.flight.legs[1].duration -
          (b.flight.legs[0].duration + b.flight.legs[1].duration)
      );
    }
    if (state.priceStart) {

      filtredData = filtredData.filter(
        (el) => el.flight.price.total.amount >= Number(state.priceStart)
      );
    }
    if (state.priceEnd) {
     
      filtredData = filtredData.filter(
        (el) => el.flight.price.total.amount <= Number(state.priceEnd)
      );
    }
    setData(filtredData);
  }, [state, state.filtredData]);

  return (
    <div className="sorting">
      <p>Сортировать</p>
      <input
        onChange={handleChange}
        type="radio"
        id="cheapest"
        name="sorting"
        value="cheapest"
      />
      <label htmlFor="cheapest">по возрастанию цены</label>
      <br />
      <input
        onChange={handleChange}
        type="radio"
        id="expensive"
        name="sorting"
        value="expensive"
      />
      <label htmlFor="expensive">по убыванию цены</label>
      <br />
      <input
        onChange={handleChange}
        type="radio"
        id="duration"
        name="sorting"
        value="duration"
      />
      <label htmlFor="duration">по времени в пути</label>
      <p>Фильтровать</p>
      <input
        onChange={handleChange}
        type="radio"
        id="all"
        name="stops"
        value="all"
      />
      <label htmlFor="stop">Все</label> <br />
      <input
        onChange={handleChange}
        type="radio"
        id="stop"
        name="stops"
        value="stop"
      />
      <label htmlFor="stop">1 пересадка</label> <br />
      <input
        onChange={handleChange}
        type="radio"
        id="direct"
        name="stops"
        value="direct"
      />
      <label htmlFor="direct">без пересадок</label>
      <br />
      <p>Цена</p>
      От{" "}
      <input
        type="number"
        placeholder="от"
        value={state.priceStart}
        name="priceStart"
        onChange={handleChange}
      />
      <br />
      До{" "}
      <input
        type="number"
        placeholder="до"
        value={state.priceEnd}
        name="priceEnd"
        onChange={handleChange}
      />
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
