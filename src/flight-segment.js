import React from "react";
import moment from "moment";
import "./flight-segment.css";

const FlightSegment = ({ el, leg, segments, stops, idx }) => {
  const getTimeFromMins = (mins) => {
    let hours = Math.trunc(mins / 60);
    let minutes = mins % 60;
    return hours + " ч " + minutes + " мин";
  };
  const dateFormat = (date) => {
    moment.locale("ru");
    return moment(date, "YYYY-MM-DD").format("DD MMM");
  };

  const timeFormat = (date) => {
    return moment(date, "HH:mm:ss").format(" HH:mm");
  };
  return (
    <div className="flight-segment">
      <span className="direction">
        <span className="departure">
          {segments[0].departureCity?.caption},{" "}
          {segments[0].departureAirport?.caption}{" "}
          <span className="airport-code">
            ({segments[0].departureAirport?.uid})
          </span>
        </span>
        <i className="small material-icons"> arrow_forward</i>
        <span className="arrival">
          {segments[idx].arrivalCity?.caption},{" "}
          {segments[idx].arrivalAirport?.caption}{" "}
          <span className="airport-code">
            ({segments[idx].arrivalAirport?.uid})
          </span>
        </span>
      </span>
      <br />
      <span className="timing">
        <span className="schedule">
          <span className="time">{timeFormat(segments[0].departureDate)}</span>
          <span className="date"> {dateFormat(segments[0].departureDate)}</span>
        </span>
        <span className="duration">
          <i className="small material-icons">schedule</i>
          {getTimeFromMins(leg.duration)}
        </span>
        <span className="schedule">
          <span className="date">{dateFormat(segments[idx].arrivalDate)}</span>
          <span className="time"> {timeFormat(segments[idx].arrivalDate)}</span>
        </span>
      </span>
      <br />
      <span className="stop">
        <span className="stop-text">{stops}</span>
      </span>
      <span>Рейс выполняет: {el.flight.carrier.caption}</span>
    </div>
  );
};

export default FlightSegment;
