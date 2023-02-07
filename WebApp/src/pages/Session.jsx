import React, { useEffect, useState } from "react";
import _ from "lodash";
import { Navigate, useNavigate } from "react-router-dom";
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
  Stack,
  Skeleton,
} from "@chakra-ui/react";
import { HubConnectionBuilder } from "@microsoft/signalr";
import { BASE_URL, closeSession, getProductsByVenue } from "../api";
import { Layout, SessionStateCard, StateCard } from "../components";
import useDSessionStore from "../hooks/useDSessionStore";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useFormik } from "formik";
import { AddConsumptionFormValidation } from "../utils/formValidations";
import useUserStore from "../hooks/useUserStore";
import { separateStates } from "../utils";

const Session = () => {
  const navigate = useNavigate();
  const [connection, setConnection] = useState();
  const [sessionState, setSessionState] = useState([]);

  const { sessionDetails, setSessionDetails } = useDSessionStore((state) => ({
    setSessionDetails: state.setSessionDetails,
    sessionDetails: state.sessionDetails,
  }));

  const user = useUserStore((state) => state.user);

  if (!sessionDetails) {
    return <Navigate to="../" />;
  }

  useEffect(() => {
    const connect = new HubConnectionBuilder()
      .withUrl(`${BASE_URL}rts`)
      .withAutomaticReconnect()
      .build();

    setConnection(connect);

    return () => {
      connect.stop();
    };
  }, [sessionDetails]);

  useEffect(() => {
    if (connection) {
      connection.on("consumption_added", (data) => {
        setSessionState((prevState) => [...prevState, data]);
      });

      connection.on("amount_changed", (data) => {
        setSessionState((prevState) =>
          prevState.map((state) => {
            if (state.id === data.id) {
              state.amount = data.amount;
            }

            return state;
          })
        );
      });

      connection.on("session_closed", () => {
        navigate(`../summary/${sessionDetails.sessionId}`);
      });

      connection
        .start()
        .then(() => {
          connection
            .invoke("JoinSession", {
              Code: sessionDetails.sessionCode.toString(),
              Name: sessionDetails.username,
            })
            .then(setSessionState);
        })
        .catch((error) => console.log(error));
    }
  }, [connection]);

  const productsQuery = useQuery({
    queryKey: ["products", sessionDetails.venue.id],
    enabled: sessionDetails !== null && sessionDetails !== undefined,
    queryFn: () => getProductsByVenue(sessionDetails.venue.id),
  });

  const closeSessionMutation = useMutation({
    mutationFn: (id) => closeSession(id),
    onSuccess: () => {
      connection.invoke("CloseSession", sessionDetails.sessionCode.toString());
    },
  });

  const productForm = useFormik({
    initialValues: {
      product: "",
    },
    validationSchema: AddConsumptionFormValidation,
    onSubmit: (values) => {
      let consumption = {
        Username: sessionDetails.username,
        Amount: 1,
        DrinkSessionId: sessionDetails.sessionId,
        ProductId: parseInt(values.product),
      };
      connection.invoke("AddConsumption", consumption);
      productForm.resetForm();
    },
  });

  function handleChangeAmount(consumptionId, newAmount) {
    if (newAmount === 0) return;

    let st = sessionState.find((x) => x.id == consumptionId);

    if (st == null) return;

    let consumption = {
      Id: st.id,
      Username: sessionDetails.username,
      Amount: newAmount,
      DrinkSessionId: sessionDetails.sessionId,
      ProductId: st.product.id,
    };

    connection.invoke("ChangeAmount", consumption);
  }

  function handleCloseSession(e) {
    e.preventDefault();
    closeSessionMutation.mutate(sessionDetails.sessionId);
  }

  const separadedState = separateStates(sessionState);

  const userState = separadedState.find(
    (x) => x.username === sessionDetails.username
  );

  return (
    <Layout>
      <Flex justifyContent="space-between">
        <Text as="b">Venue: {sessionDetails.venue.name}</Text>
        <Text as="b">Code: {sessionDetails.sessionCode}</Text>
      </Flex>
      <Divider />
      <Card mt="3">
        <CardHeader>
          <Heading size="md">My State</Heading>
        </CardHeader>
        <CardBody>
          <Box as="form" onSubmit={productForm.handleSubmit} mb="3">
            <Select
              id="product"
              name="product"
              value={productForm.values.product}
              onChange={productForm.handleChange}
              placeholder="Product"
            >
              {productsQuery.data?.map((product, i) => (
                <option key={i} value={product.id}>
                  {`${product.name} (${product.price}Ft)`}
                </option>
              ))}
            </Select>
            <Button type="submit" mt="2">
              Add
            </Button>
          </Box>
          <Divider />
          {sessionState ? (
            <VStack
              mt="3"
              divider={<StackDivider />}
              spacing={4}
              align="stretch"
            >
              {userState?.consumptions.map((c, i) => (
                <StateCard
                  key={i}
                  consumption={c}
                  changeAmount={handleChangeAmount}
                />
              ))}
            </VStack>
          ) : (
            <Stack>
              <Skeleton height="20px" />
              <Skeleton height="20px" />
              <Skeleton height="20px" />
            </Stack>
          )}
        </CardBody>
      </Card>
      <Card mt="6">
        <CardHeader>
          <Heading size="md">Session State</Heading>
        </CardHeader>
        <CardBody>
          {sessionState ? (
            <VStack
              mt="3"
              divider={<StackDivider />}
              spacing={4}
              align="stretch"
            >
              {separadedState?.map((s, i) => (
                <SessionStateCard key={i} state={s} />
              ))}
            </VStack>
          ) : (
            <Stack>
              <Skeleton height="20px" />
              <Skeleton height="20px" />
              <Skeleton height="20px" />
            </Stack>
          )}
        </CardBody>
      </Card>
      {user && user.id === sessionDetails.ownerId && (
        <Box>
          <Button
            isLoading={closeSessionMutation.isLoading}
            onClick={(e) => handleCloseSession(e)}
            margin="2rem auto"
          >
            Session Close
          </Button>
        </Box>
      )}
    </Layout>
  );
};

export default Session;
