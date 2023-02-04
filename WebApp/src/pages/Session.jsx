import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Divider,
  Flex,
  Text,
  Card,
  CardHeader,
  CardBody,
  Button,
  Box,
  Select,
  VStack,
  StackDivider,
  Heading,
} from "@chakra-ui/react";
import { HubConnectionBuilder } from "@microsoft/signalr";
import { BASE_URL } from "../api";
import { Layout, SessionStateCard, StateCard } from "../components";
import useDSessionStore from "../hooks/useDSessionStore";

const Session = () => {
  const navigate = useNavigate();
  const { sessionDetails, setSessionDetails } = useDSessionStore((state) => ({
    setSessionDetails: state.setSessionDetails,
    sessionDetails: state.sessionDetails,
  }));

  useEffect(() => {
    if (!sessionDetails) {
      navigate("../");
    }

    createConnection();
  }, []);

  async function createConnection() {
    const connection = new HubConnectionBuilder()
      .withUrl(`${BASE_URL}rts`)
      .build();

    await connection.start();
    await connection
      .invoke("JoinSession", { Code: 20 })
      .then((res) => console.log(res));

    connection.on("valamit", (o) => {
      console.log(o);
    });
  }

  return (
    <Layout>
      <Flex justifyContent="space-between">
        <Text as="b">Venue: valami</Text>
        <Text as="b">Code: 20</Text>
      </Flex>
      <Divider />
      <Card mt="3">
        <CardHeader>
          <Heading size="md">My State</Heading>
        </CardHeader>
        <CardBody>
          <Box mb="3">
            <Select placeholder="Product"></Select>
            <Button mt="2">Add</Button>
          </Box>
          <Divider />
          <VStack mt="3" divider={<StackDivider />} spacing={4} align="stretch">
            <StateCard key={1} />
            <StateCard key={2} />
            <StateCard key={3} />
          </VStack>
        </CardBody>
      </Card>
      <Card mt="6">
        <CardHeader>
          <Heading size="md">Session State</Heading>
        </CardHeader>
        <CardBody>
          <VStack mt="3" divider={<StackDivider />} spacing={4} align="stretch">
            <SessionStateCard key={4} />
            <SessionStateCard key={5} />
            <SessionStateCard key={6} />
          </VStack>
        </CardBody>
      </Card>

      <Box>
        <Button margin="2rem auto">Session Close</Button>
      </Box>
    </Layout>
  );
};

export default Session;
