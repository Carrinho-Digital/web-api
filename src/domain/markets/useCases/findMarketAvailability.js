const moment = require('moment');

function buildFindMarketAvailability({
  getDeliveryAvailabilities,
}) {
  function isOnSameDay(customerFrom, customerTo) {
    const toDayOfWeek = customerTo.weekday();
    const fromDayOfWeek = customerFrom.weekday();

    return fromDayOfWeek === toDayOfWeek;
  }

  function findDayOfWeek(customerFrom) {
    const weekdays = moment.weekdays();
    const chooseWeekday = customerFrom.weekday();

    return weekdays[chooseWeekday].toLowerCase();
  }

  function normalizeAvailabilities(customerFrom, hours) {
    const marketAvailabilityTimeFrom = moment(hours.from).utc();
    const marketAvailabilityTimeTo = moment(hours.to).utc();

    function keepTime(momentDate) {
      return {
        hours: momentDate.hours(),
        minutes: momentDate.minutes(),
        seconds: momentDate.seconds(),
      };
    }

    const updateOnlyDate = {
      year: customerFrom.year(),
      date: customerFrom.date(),
      month: customerFrom.month(),
    };

    return [
      marketAvailabilityTimeFrom.set({
        ...updateOnlyDate,
        ...keepTime(marketAvailabilityTimeFrom),
      }),
      marketAvailabilityTimeTo.set({
        ...updateOnlyDate,
        ...keepTime(marketAvailabilityTimeTo),
      }),
    ];
  }

  function findAvailability(hours, customerFrom, customerTo) {
    const [marketFrom, marketTo] = normalizeAvailabilities(
      customerFrom, hours);

    if (customerFrom >= marketFrom && customerTo <= marketTo) {
      return [marketFrom, marketTo];
    }

    return null;
  }

  return async function findMarketAvailability(
    marketId,
    customerFrom,
    customerTo,
  ) {
    if (!moment.isMoment(customerFrom) || !moment.isMoment(customerTo)) {
      throw new Error('You must provide a moment instance');
    }

    if (!isOnSameDay(customerFrom, customerTo)) {
      return null;
    }

    const customerWeekday = findDayOfWeek(customerFrom);
    const availabilities = await getDeliveryAvailabilities(marketId);

    const availbilityOnWeekday = availabilities.find(availability =>
      availability.dayOfWeek === customerWeekday);

    if (!availbilityOnWeekday) {
      return null;
    }

    const availailityChoosen = availbilityOnWeekday.availabilities
      .reduce((prev, hours) =>
        findAvailability(hours, customerFrom, customerTo), null);

    if (availailityChoosen) {
      return availailityChoosen;
    }

    return null;
  };
}

module.exports = buildFindMarketAvailability;
