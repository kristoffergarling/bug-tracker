import { format } from "date-fns";

export const formatDateTime = (date: Date) => {
  return format(new Date(date), "yyyy/MM/dd '-' hh':'mm");
};
