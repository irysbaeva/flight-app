import React from "react";
import FlightSegment from "./flight-segment";
import "./flight-info.css";

const FlightInfo = ({ el }) => {
  const legs = el.flight.legs;
  const outbandSegments = legs[0].segments;
  const inboundSegments = legs[1].segments;
  const idx = outbandSegments.length === 2 ? 1 : 0;
  const idx2 = inboundSegments.length === 2 ? 1 : 0;
  const stops = outbandSegments.length === 2 ? "1 пересадка" : "прямой";
  const stops2 = inboundSegments.length === 2 ? "1 пересадка" : "прямой";
  return (
    <div className="flight-info" key={el.flightToken}>
      <p className="flight-header">
        <span> {el.flight.carrier.caption} </span>
        <span className="price">
          {el.flight.price.total.amount} р <br />{" "}
          <span className="price-details">
            {" "}
            Стоимость для одного взрослого пассажира
          </span>
        </span>
      </p>
      <br />

      <FlightSegment
        el={el}
        leg={legs[0]}
        segments={outbandSegments}
        stops={stops}
        idx={idx}
      />

      <FlightSegment
        el={el}
        leg={legs[1]}
        segments={inboundSegments}
        stops={stops2}
        idx={idx2}
      />
      <button className="btn-choose">ВЫБРАТЬ</button>
    </div>
  );
};

export default FlightInfo;
