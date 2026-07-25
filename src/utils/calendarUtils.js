export const getMonthYearString = (date) => {
  return date.toLocaleString('default', {month: 'long', year: 'numeric'});
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
