const moment = require("moment");

export const formatDate = (date) => {
  return moment(date).format("DD/MM/YYYY");
};
//   date ? date.toISOString().split("T")[0] : "";
