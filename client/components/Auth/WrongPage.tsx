import React from "react";
import { Typography, Link } from "@mui/material";
import NextLink from "next/link";

import { CenteredFlexBox } from "../../styles/customStyles";

interface WrongPageProps {
  type: string;
}

const WrongPage: React.FC<WrongPageProps> = ({ type }) => {
  return (
    <CenteredFlexBox sx={{ marginTop: "15px" }}>
      <Typography variant="subtitle1" component="p">
        {/* eslint-disable-next-line react/no-unescaped-entities */}
        {type === "signin"
          ? "Don't have an account?"
          : "Already have an account?"}{" "}
        <strong>
          <NextLink href={type === "signin" ? "/signup" : "signin"}>
            <Link sx={{ cursor: "pointer", textDecoration: "none" }}>
              {type === "signin" ? "Sign Up" : "Log In"}
            </Link>
          </NextLink>
        </strong>
      </Typography>
    </CenteredFlexBox>
  );
};
export default WrongPage;
