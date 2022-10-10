import { useMediaQuery, useTheme } from "@mui/material";

const getBreakpoints = () => {
  const theme = useTheme();

  const breakpoints = {
    xs: useMediaQuery(theme.breakpoints.down("xs")),
    sm: useMediaQuery(theme.breakpoints.down("sm")),
    md: useMediaQuery(theme.breakpoints.down("md")),
    lg: useMediaQuery(theme.breakpoints.down("lg")),
    xl: useMediaQuery(theme.breakpoints.down("xl")),
  };

  return breakpoints;
};

export default getBreakpoints;
