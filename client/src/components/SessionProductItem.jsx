import React from "react";
import { SPORTS_BAR } from "@/utils/constants";
import { MyIconComponent } from "@/utils/icons";
import {
  Box,
  Paper,
  useMediaQuery,
  Button,
  Typography,
  ButtonGroup,
} from "@mui/material";

const SessionProductItem = () => {
  const smDevice = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  return (
    <Box
      component={Paper}
      variant="outlined"
      padding="0.3rem"
      margin="0.5rem"
      width={smDevice ? "100%" : "450px"}
      display="flex"
      justifyContent="space-between"
      alignItems="center"
    >
      <Box
        display="flex"
        alignItems="center"
        flexDirection={smDevice ? "column" : "row"}
      >
        <Box display="flex" alignItems="center">
          <MyIconComponent large name={SPORTS_BAR} />
          <Typography margin="0 0.5rem" variant="h5">
            {`${"Beer"}`}
          </Typography>
        </Box>

        <Typography ml="5px" variant="body1">
          Price: 2000Ft
        </Typography>
      </Box>

      <Box>
        <ButtonGroup
          variant="outlined"
          aria-label="outlined primary button group"
        >
          <Button>+</Button>
          <Button>-</Button>
          <Button color="inherit">4</Button>
        </ButtonGroup>
      </Box>
    </Box>
  );
};

export default SessionProductItem;
