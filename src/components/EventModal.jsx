import React, {useState} from 'react';
import {getTimeSlots} from '../utils/calendarUtils';

const EventModal = ({data, onClose}) => {
  const timeSlots = data.tours.flatMap((tour) => getTimeSlots(tour.time));

  /* ===== State ===== */
  const [selectedTime, setSelectedTime] = useState(timeSlots[0]);

  const formattedDate = data.date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  /* ===== JSX Return ===== */
  return (
    <>
      <div className="overlay" onClick={onClose}></div>
      <div className="modal">
        <div className="modal-header">
          <h2 className="modal-title">Tour Details</h2>
          <button
            className="modal-close-button"
            onClick={onClose}
            aria-label="Close"
          >
            &times;
          </button>
        </div>
        <p className="modal-date">{formattedDate}</p>
        <label className="modal-times-label" htmlFor="tour-time">
          Pick a time
        </label>
        <select
          className="modal-times-select"
          id="tour-time"
          onChange={(e) => setSelectedTime(e.target.value)}
          value={selectedTime}
        >
          {timeSlots.map((timeSlot) => (
            <option key={timeSlot} value={timeSlot}>
              {timeSlot}
            </option>
          ))}
        </select>
        <button className="modal-button modal-button-primary" onClick={onClose}>
          Schedule a Tour
        </button>
      </div>
    </>
  );
};

export default EventModal;
