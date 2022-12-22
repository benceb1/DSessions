import React from "react";
import { MyIconComponent } from "@/utils/icons";
import { Box, Paper, useMediaQuery, Typography, Tooltip } from "@mui/material";
import { IconList } from "../utils/icons";

const SessionStateItem = () => {
  const smDevice = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  return (
    <Box
      component={Paper}
      variant="outlined"
      padding="0.3rem 0.7rem"
      margin="0.5rem"
      width={smDevice ? "100%" : "450px"}
      display="flex"
      justifyContent="space-between"
      alignItems="center"
    >
      <Box>
        <Typography variant="h5">Username</Typography>
        <Typography variant="body1">Total: 20000Ft</Typography>
      </Box>
      <Box display="flex" flexWrap="wrap">
        {IconList.map((icon, i) => (
          <Tooltip key={i} title="Sör">
            <Box display="flex" alignItems="center" margin="0 5px">
              <MyIconComponent key={i} name={icon.name} />
              <Typography p="3px" variant="body1">
                4
              </Typography>
            </Box>
          </Tooltip>
        ))}
      </Box>
    </Box>
  );
};

export default SessionStateItem;
