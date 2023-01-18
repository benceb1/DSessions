import { Heading } from "@chakra-ui/react";
import React from "react";
import BeverageIcon from "../components/BeverageIcon";
import Layout from "../components/Layout";

const Main = () => {
  return (
    <Layout>
      <Heading> This is a Heading</Heading>
      <BeverageIcon icon="wine" fontSize="100px" />
    </Layout>
  );
};

export default Main;
