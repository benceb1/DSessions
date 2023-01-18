import React from "react";
import { DeleteIcon } from "@chakra-ui/icons";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  Button,
  Card,
  CardBody,
  Divider,
  Flex,
  FormControl,
  FormErrorMessage,
  Heading,
  IconButton,
  Input,
  Spacer,
  StackDivider,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Layout } from "../components";
import { randomColor } from "../utils";
import { useFormik } from "formik";
import { VenueFormValidation } from "../utils/formValidations";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addVenue, deleteVenue, getVenues } from "../api";

const Venues = () => {
  const queryClient = useQueryClient();

  const venuesQuery = useQuery({
    queryKey: ["venues"],
    queryFn: getVenues,
  });

  const addVenueMutation = useMutation({
    mutationFn: addVenue,
    onSuccess: (data) => {
      queryClient.setQueryData(["venues"], (old) => [...old, data]);
    },
  });

  const deleteVenueMutation = useMutation({
    mutationFn: deleteVenue,
    onSuccess: (_, id) => {
      queryClient.setQueryData(["venues"], (old) =>
        old.filter((venue) => venue.id != id)
      );
    },
  });

  const formik = useFormik({
    initialValues: {
      name: "",
    },
    validationSchema: VenueFormValidation,
    onSubmit: (values) => {
      addVenueMutation.mutate(values);
      formik.resetForm();
    },
  });

  return (
    <Layout>
      <Heading>Venues</Heading>
      <Heading
        as="h6"
        size="xs"
        mt={5}
        bgGradient={`linear(to-l, #7928CA, ${randomColor(500)})`}
        bgClip="text"
      >
        You can add a new venue here
      </Heading>
      <Flex as="form" onSubmit={formik.handleSubmit} alignItems="center" mb={4}>
        <FormControl isInvalid={formik.touched.name && formik.errors.name}>
          <Input
            id="venue-name"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
          />
          <FormErrorMessage>{formik.errors.name}</FormErrorMessage>
        </FormControl>
        <FormControl flex={1}>
          <Button type="submit" m={1}>
            Add
          </Button>
        </FormControl>
      </Flex>

      {addVenueMutation.error && (
        <Alert status="error">
          <AlertIcon />
          <AlertDescription>{addVenueMutation.error.message}</AlertDescription>
        </Alert>
      )}

      <Divider />

      <VStack mt={4} divider={<StackDivider />} spacing={4} align="stretch">
        {venuesQuery.data?.map((venue, i) => (
          <Card key={i}>
            <CardBody>
              <Flex alignItems="center">
                <Text as="b" fontSize="lg">
                  {venue.name}
                </Text>
                <Spacer />
                <IconButton
                  onClick={() => deleteVenueMutation.mutate(venue.id)}
                  icon={<DeleteIcon />}
                />
              </Flex>
            </CardBody>
          </Card>
        ))}
      </VStack>
    </Layout>
  );
};

export default Venues;
