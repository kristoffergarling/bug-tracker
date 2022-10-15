import { format } from "date-fns";
import storage from "./localStorage";

export const formatDateTime = (date: Date) => {
  return format(new Date(date), "hh':'mm '-' yyyy/MM/dd");
};

export const firstLetterToUpperCase = (s: string) => {
  return s.charAt(0).toUpperCase() + s.slice(1);
};
