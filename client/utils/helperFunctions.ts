import { format } from "date-fns";
import storage from "./localStorage";

export const formatDateTime = (date: Date) => {
  return format(new Date(date), "yyyy/MM/dd '-' hh':'mm");
};
