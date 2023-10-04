import moment from "moment";
import { FORMAT_DATE } from "../constants/format";

export const formatDate = (date, format = FORMAT_DATE) => {
  if (!date) return "";
  return moment(date).format(format);
};


// ---- Format number to display currency ----//
export const formatCurrency = (data, type = "vi-VN") => {
  if (!data) return 0;
  return data.toLocaleString(type);
};