const CLOCK_AM = 'AM';
const CLOCK_PM = 'PM';

export const getMonthYearString = (date) => {
  return date.toLocaleString('default', {month: 'long', year: 'numeric'});
};

const getHourFromToken = (token) => {
  const [, hourString, meridiem] = token.match(/^(\d{1,2})(AM|PM)$/);
  const hour = Number(hourString);

  if (meridiem === CLOCK_AM) {
    return hour === 12 ? 0 : hour;
  }

  return hour === 12 ? 12 : hour + 12;
};

const formatTimeSlot = (hour, minutes) => {
  const meridiem = hour < 12 ? CLOCK_AM : CLOCK_PM;
  const displayHour = hour % 12 === 0 ? 12 : hour % 12;

  return `${displayHour}:${String(minutes).padStart(2, '0')} ${meridiem}`;
};

/**
 * Splits a tour window like "4PM-6PM" into the 30-minute slots a visitor can actually book, e.g. "4:00 PM", "4:30 PM", "5:00 PM", "5:30 PM".
 * @param {string} timeRange A tour window in the "<start><AM|PM>-<end><AM|PM>" format.
 * @returns {Array} The available 30-minute time slots within that window.
 */
export const getTimeSlots = (timeRange) => {
  const [startToken, endToken] = timeRange.split('-');
  const startHour = getHourFromToken(startToken);
  const endHour = getHourFromToken(endToken);
  const slots = [];

  for (let halfHour = startHour * 2; halfHour < endHour * 2; halfHour++) {
    slots.push(formatTimeSlot(Math.floor(halfHour / 2), halfHour % 2 === 0 ? 0 : 30));
  }

  return slots;
};

/**
 * Generates an array of days for the calendar view based on the current date and available tour days.
 * @param {Date} date The current date.
 * @param {Array} availableTourDays An array of available tour days.
 * @returns {Array} An array of day objects for the calendar view.
 */
export const generateCalendarDays = (date, availableTourDays) => {
  const year = date.getFullYear();
  const month = date.getMonth();
  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);
  const firstDayOfWeek = firstDayOfMonth.getDay();
  const daysInMonth = lastDayOfMonth.getDate();

  const days = [];

  // Fill in the days before the first day of the month.
  for (let i = 0; i < firstDayOfWeek; i++) {
    days.push({date: null});
  }

  // Fill in the days of the month.
  for (let day = 1; day <= daysInMonth; day++) {
    const dayDate = new Date(year, month, day);
    const isToday = dayDate.toDateString() === new Date().toDateString();
    const tours = availableTourDays.filter(
      (tour) => new Date(tour.date).toDateString() === dayDate.toDateString()
    );

    days.push({
      date: dayDate,
      isToday,
      tours,
    });
  }

  return days;
};
