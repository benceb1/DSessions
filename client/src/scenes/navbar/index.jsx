import React from "react";
import FlexBetween from "@/components/FlexBetween";
import { useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <FlexBetween padding="1rem 6%">
      <Typography
        fontWeight="bold"
        fontSize="clamp(1rem, 2rem, 2.25rem)"
        color="secondary"
        onClick={() => navigate("/")}
        sx={{
          "&:hover": {
            cursor: "pointer",
          },
        }}
      >
        {"<Habár>"}
      </Typography>
    </FlexBetween>
  );
};

export default Navbar;
