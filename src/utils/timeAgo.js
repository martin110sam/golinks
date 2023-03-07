import React from "react";

const timeAgo = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);
  const diffYears = Math.floor(diffDays / 365); // calculate the difference in years
  const minutes = diffMins % 60;
  const hours = diffHours % 24;
  const days = diffDays % 365; // calculate the remaining days after removing the years
  let timeAgoString = "";

  if (diffYears) {
    // if difference in years is greater than zero
    timeAgoString += diffYears + " years, ";
  }
  if (days) {
    // if remaining days is greater than zero
    timeAgoString += days + " days, ";
  }
  if (hours) {
    timeAgoString += hours + " hours, ";
  }

  timeAgoString += minutes + " minutes ago";
  return timeAgoString;
};

export default timeAgo;
