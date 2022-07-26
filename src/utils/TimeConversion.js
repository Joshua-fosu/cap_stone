import * as TimeConstants from "./TimeConstants";

export const findTimeElapsed = (createdAt) => {
  var timeNow = new Date().getTime();
  const diff = timeNow - new Date(createdAt).getTime();

  var timeToReturn = "";
  var unit = "";

  if (diff >= TimeConstants.thresholdYearInMillisecond) {
    timeToReturn = Math.floor(diff / TimeConstants.thresholdYearInMillisecond);
    unit = " year";
  } else if (diff >= TimeConstants.thresholdMonthInMillisecond) {
    timeToReturn = Math.floor(diff / TimeConstants.thresholdMonthInMillisecond);
    unit = " month";
  } else if (diff >= TimeConstants.thresholdWeekInMillisecond) {
    timeToReturn = Math.floor(diff / TimeConstants.thresholdWeekInMillisecond);
    unit = " week";
  } else if (diff >= TimeConstants.thresholdDayInMillisecond) {
    timeToReturn = Math.floor(diff / TimeConstants.thresholdDayInMillisecond);
    unit = " day";
  } else if (diff >= TimeConstants.thresholdHourInMillisecond) {
    timeToReturn = Math.floor(diff / TimeConstants.thresholdHourInMillisecond);
    unit = " hour";
  } else if (diff >= TimeConstants.baseMinuteInMillisecond) {
    timeToReturn = Math.floor(diff / TimeConstants.baseMinuteInMillisecond);
    unit = " minute";
  } else if (diff >= TimeConstants.baseSecondInMillisecond) {
    timeToReturn = Math.floor(diff / TimeConstants.baseSecondInMillisecond);
    unit = " second";
  }
  unit += timeToReturn > 1 ? "s ago" : " ago";
  timeToReturn += unit;

  return timeToReturn;
};
