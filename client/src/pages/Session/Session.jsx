import React from "react";
import FlexMidWrapper from "@/components/FlexMidWrapper";
import { Box, Divider, Typography, useMediaQuery, Button } from "@mui/material";
import ManageProductsSection from "./ManageProductsSection";
import SessionStateItem from "../../components/SessionStateItem";
import qr from "../../assets/QR1.jpg";

const Session = () => {
  const smDevice = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  return (
    <FlexMidWrapper>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="flex-end"
        width={smDevice ? "100%" : "450px"}
      >
        <Box>
          <Typography variant="h6">{`Venue: Pocok`}</Typography>
          <Typography variant="h6">{`Owner: Valaki`}</Typography>
        </Box>
        <Typography variant="h6">{`Session number: 70`}</Typography>
      </Box>

      <Divider
        orientation="horizontal"
        sx={{ mr: "-1px", width: smDevice ? "100%" : "450px" }}
      />
      {/** MANAGE PRODUCT */}
      <Box marginTop="2rem" width={smDevice ? "100%" : "450px"}>
        <Typography variant="h3">My State</Typography>
      </Box>
      <ManageProductsSection />
      <Divider
        orientation="horizontal"
        sx={{ mr: "-1px", width: smDevice ? "100%" : "450px" }}
      />
      {/** SESSION STATE */}
      <Box marginTop="2rem" width={smDevice ? "100%" : "450px"}>
        <Typography variant="h3">Session State</Typography>
      </Box>
      {sstate.map((s, i) => (
        <SessionStateItem key={i} />
      ))}
      <Divider
        orientation="horizontal"
        sx={{ mr: "-1px", width: smDevice ? "100%" : "450px" }}
      />
      <Box padding="0.5rem 0" width={smDevice ? "100%" : "450px"}>
        <Typography variant="h5">Total: 100000000000Ft</Typography>
      </Box>
      {/** OWNER SECTION */}
      <img src={qr} width="200px" style={{ margin: "2rem" }} />
      <Button variant="contained" color="error">
        Close Session
      </Button>
    </FlexMidWrapper>
  );
};

export default Session;

const sstate = [{}, {}, {}];
