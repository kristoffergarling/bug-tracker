import { format } from "date-fns";
import storage from "./localStorage";

export const formatDateTime = (date: Date) => {
  return format(new Date(date), "hh':'mm '-' yyyy/MM/dd");
};

export const firstLetterToUpperCase = (s: string) => {
  return s.charAt(0).toUpperCase() + s.slice(1);
};

export const renderPrioColor = (prio: string) => {
  switch (prio) {
    case "low":
      return "success";
    case "medium":
      return "warning";
    case "high":
      return "error";
    default:
      return "info";
  }
};

export const shortenString = (s: string, length: number) => {
  return s.length > length ? s.substring(0, length) + "..." : s;
};
