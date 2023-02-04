import { Box, Container } from "@chakra-ui/react";
import React from "react";
import Navbar from "./Navbar";

const Layout = ({ children }) => {
  return (
    <Box minHeight="100vh">
      <Navbar />
      <Container mt="5" mb="5">
        {children}
      </Container>
    </Box>
  );
};

export default Layout;
