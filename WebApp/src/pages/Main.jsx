import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Select,
  StackDivider,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createSession, getOpenSessions, getVenues } from "../api";
import Layout from "../components/Layout";
import useDSessionStore from "../hooks/useDSessionStore";
import useUserStore from "../hooks/useUserStore";
import { CreateSessionFormValidation } from "../utils/formValidations";

const Main = () => {
  const navigate = useNavigate();
  const setSessionDetails = useDSessionStore(
    (state) => state.setSessionDetails
  );
  const queryClient = useQueryClient();
  const [sessionUserName, setSessionUserName] = useState("");
  const [sessionNameError, setSessionNameError] = useState("");

  const { user } = useUserStore((state) => ({
    user: state.user,
    logout: state.logout,
  }));

  const venuesQuery = useQuery({
    queryKey: ["venues"],
    queryFn: getVenues,
  });

  const sessionsQuery = useQuery({
    queryKey: ["open-sessions"],
    queryFn: getOpenSessions,
  });

  const createSessionMutation = useMutation({
    mutationFn: createSession,
    onSuccess: () => {
      queryClient.invalidateQueries(["open-sessions"]);
    },
  });

  const createSessionForm = useFormik({
    initialValues: {
      venue: "",
      code: "",
    },
    validationSchema: CreateSessionFormValidation,
    onSubmit: (values) => {
      createSessionMutation.mutate({
        code: values.code,
        venueId: values.venue,
        userId: user.id,
      });

      createSessionForm.resetForm();
    },
  });

  const handleJoin = (e, session) => {
    e.preventDefault();

    if (sessionUserName == "" || !sessionUserName) {
      setSessionNameError("Session name cannot be empty!");
      return;
    }

    setSessionUserName("");

    setSessionDetails({
      username: sessionUserName,
      sessionCode: session.code,
      sessionID: session.id,
    });

    navigate("../session");
  };

  return (
    <Layout>
      {user && (
        <Card
          as="form"
          onSubmit={createSessionForm.handleSubmit}
          margin="1rem auto"
        >
          <CardHeader>
            <Heading size="md">Create Session</Heading>
          </CardHeader>
          <CardBody>
            <VStack>
              <FormControl
                isInvalid={
                  createSessionForm.touched.venue &&
                  createSessionForm.errors.venue
                }
              >
                <FormLabel>Select the Venue!</FormLabel>
                <Select
                  id="venue"
                  name="venue"
                  value={createSessionForm.values.venue}
                  onChange={createSessionForm.handleChange}
                  placeholder="Select the Venue"
                  mt={3}
                  mb={3}
                >
                  {venuesQuery.data?.map((venue, i) => (
                    <option key={i} value={venue.id}>
                      {venue.name}
                    </option>
                  ))}
                </Select>
                <FormErrorMessage>
                  {createSessionForm.errors.venue}
                </FormErrorMessage>
              </FormControl>
              <FormControl
                isInvalid={
                  createSessionForm.touched.code &&
                  createSessionForm.errors.code
                }
              >
                <FormLabel>Session Code</FormLabel>
                <Input
                  id="code"
                  name="code"
                  value={createSessionForm.values.code}
                  onChange={createSessionForm.handleChange}
                />
                <FormErrorMessage>
                  {createSessionForm.errors.code}
                </FormErrorMessage>
              </FormControl>
              <FormControl>
                <Button type="submit">Create</Button>
              </FormControl>
            </VStack>
          </CardBody>
        </Card>
      )}

      <Card margin="1rem auto">
        <CardHeader>
          <Heading size="md">Join Session</Heading>
        </CardHeader>
        <CardBody>
          <FormControl m="1rem 0" isInvalid={sessionNameError}>
            <FormLabel>Your name</FormLabel>
            <Input
              value={sessionUserName}
              onChange={(e) => {
                setSessionUserName(e.target.value);
                if (e.target.value != "" && sessionNameError)
                  setSessionNameError("");
              }}
            />
            <FormErrorMessage>{sessionNameError}</FormErrorMessage>
          </FormControl>
          <VStack divider={<StackDivider />} spacing={4} align="stretch">
            {sessionsQuery.data?.map((s, i) => (
              <Flex key={i} justifyContent="space-between">
                <Box>
                  <Text>name: {s.venue.name}</Text>
                  <Text>code: {s.code}</Text>
                </Box>
                <Button onClick={(e) => handleJoin(e, s)}>Join</Button>
              </Flex>
            ))}
          </VStack>
        </CardBody>
      </Card>
    </Layout>
  );
};

export default Main;
