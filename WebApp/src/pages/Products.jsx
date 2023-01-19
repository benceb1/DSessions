import React, { useState } from "react";
import { DeleteIcon } from "@chakra-ui/icons";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  Box,
  Button,
  Card,
  CardBody,
  Divider,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  IconButton,
  Input,
  NumberInput,
  NumberInputField,
  Radio,
  RadioGroup,
  Select,
  Skeleton,
  Spacer,
  StackDivider,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Layout } from "../components";
import { randomColor } from "../utils";
import BeverageIcon, { iconTypes } from "../components/BeverageIcon";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addProduct,
  deleteProduct,
  getProductsByVenue,
  getVenues,
} from "../api";
import { useFormik } from "formik";
import { ProductFormValidation } from "../utils/formValidations";

const Products = () => {
  const [selectedVenue, setSelectedVenue] = useState();

  const queryClient = useQueryClient();

  const venuesQuery = useQuery({
    queryKey: ["venues"],
    queryFn: getVenues,
  });

  const productsQuery = useQuery({
    queryKey: ["products", selectedVenue],
    enabled: selectedVenue !== null && selectedVenue !== undefined,
    queryFn: () => getProductsByVenue(selectedVenue),
  });

  const addProductMutation = useMutation({
    mutationFn: addProduct,
    onSuccess: () => {
      queryClient.invalidateQueries(["products", selectedVenue]);
    },
  });

  const deleteProductMutation = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries(["products", selectedVenue]);
    },
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      venue: "",
      icon: "wine",
      price: 0,
    },
    validationSchema: ProductFormValidation,
    onSubmit: (values, form) => {
      addProductMutation.mutate({
        name: values.name,
        icon: values.icon,
        price: values.price,
        venueId: values.venue,
      });
      form.resetForm();
    },
  });

  return (
    <Layout>
      <Heading>Products</Heading>
      <Heading
        as="h6"
        size="xs"
        mt={5}
        bgGradient={`linear(to-l, #7928CA, ${randomColor(500)})`}
        bgClip="text"
      >
        You can add a new product here
      </Heading>
      <Box as="form" onSubmit={formik.handleSubmit} alignItems="center" mb={4}>
        <FormControl
          isInvalid={formik.touched.name && formik.errors.name}
          mb="4"
        >
          <FormLabel>Product name</FormLabel>
          <Input
            id="name"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
          />
          <FormErrorMessage>{formik.errors.name}</FormErrorMessage>
        </FormControl>
        <FormControl
          isInvalid={formik.touched.price && formik.errors.price}
          mb="4"
        >
          <FormLabel>Product price (Ft)</FormLabel>
          <NumberInput>
            <NumberInputField
              id="price"
              name="price"
              value={formik.values.price}
              onChange={formik.handleChange}
            />
          </NumberInput>
          <FormErrorMessage>{formik.errors.price}</FormErrorMessage>
        </FormControl>
        <FormControl
          isInvalid={formik.touched.venue && formik.errors.venue}
          mb="4"
        >
          <FormLabel>Select the Venue!</FormLabel>
          <Select
            id="venue"
            name="venue"
            value={formik.values.venue}
            onChange={formik.handleChange}
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
          <FormErrorMessage>{formik.errors.venue}</FormErrorMessage>
        </FormControl>
        <FormControl
          isInvalid={formik.touched.icon && formik.errors.icon}
          mb="4"
        >
          <FormLabel>Select the icon!</FormLabel>
          <RadioGroup
            id="icon-radio-group"
            name="icon-radio-group"
            value={formik.values.icon}
            p="2"
          >
            <Flex justifyContent="space-between">
              {iconTypes.map((icon, i) => (
                <Radio
                  id={`icon-${i}`}
                  name="icon"
                  onChange={formik.handleChange}
                  value={icon}
                  key={i}
                >
                  <BeverageIcon icon={icon} size="lg" />
                </Radio>
              ))}
            </Flex>
          </RadioGroup>
          <FormErrorMessage>{formik.errors.icon}</FormErrorMessage>
        </FormControl>
        <FormControl>
          <Button isLoading={addProductMutation.isLoading} type="submit" m={1}>
            Add
          </Button>
        </FormControl>
        {addProductMutation.error && (
          <Alert status="error">
            <AlertIcon />
            <AlertDescription>
              {addProductMutation.error.message}
            </AlertDescription>
          </Alert>
        )}
      </Box>

      <Divider />

      <Heading as="h4" size="md" mt={10}>
        List of Products
      </Heading>
      <Select
        value={selectedVenue}
        onChange={(e) => setSelectedVenue(e.target.value)}
        placeholder="Select the Venue of products"
        mt={3}
        mb={3}
      >
        {venuesQuery.data?.map((venue, i) => (
          <option key={i} value={venue.id}>
            {venue.name}
          </option>
        ))}
      </Select>

      <VStack mt={4} divider={<StackDivider />} spacing={4} align="stretch">
        {productsQuery.isLoading ? (
          <Skeleton startColor="teal.500" endColor="yellow.500" height="20px" />
        ) : (
          productsQuery.data?.map((product, id) => (
            <Card key={id}>
              <CardBody>
                <Flex alignItems="center">
                  <Box>
                    <Heading size="xs" textTransform="uppercase">
                      {product.name}
                    </Heading>
                    <Text pt="2" fontSize="sm">
                      {product.price}Ft
                    </Text>
                  </Box>
                  <Spacer />
                  <IconButton
                    isLoading={deleteProductMutation.isLoading}
                    onClick={() => deleteProductMutation.mutate(product.id)}
                    icon={<DeleteIcon />}
                  />
                </Flex>
              </CardBody>
            </Card>
          ))
        )}
      </VStack>
    </Layout>
  );
};

export default Products;
