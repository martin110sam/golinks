import React from "react";

const formatDate = (date) => {
  let dateString = date;
  let split = dateString.split("T")[0].split("-");
  let month = split[1];
  let day = split[2];
  let year = split[0].substr(-2);
  return `${month}/${day}/${year}`;
};

export default formatDate;
