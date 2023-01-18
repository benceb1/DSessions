import React from "react";
import { DeleteIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Card,
  CardBody,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  IconButton,
  Input,
  Radio,
  RadioGroup,
  Select,
  Spacer,
  Stack,
  StackDivider,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Layout } from "../components";
import { randomColor } from "../utils";
import BeverageIcon, { iconTypes } from "../components/BeverageIcon";

const Products = () => {
  const [value, setValue] = React.useState("1");
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
      <Box alignItems="center" mb={4}>
        <FormControl>
          <Input />
        </FormControl>
        <FormControl>
          <Select placeholder="Select the Venue of product" mt={3} mb={3}>
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </Select>
        </FormControl>
        <FormControl>
          <FormLabel>Select the icon!</FormLabel>
          <RadioGroup onChange={setValue} value={value} p="2">
            <Flex justifyContent="space-between">
              {iconTypes.map((icon, i) => (
                <Radio value={icon} key={i}>
                  <BeverageIcon icon={icon} size="lg" />
                </Radio>
              ))}
            </Flex>
          </RadioGroup>
        </FormControl>
        <FormControl>
          <Button m={1}>Add</Button>
        </FormControl>
      </Box>

      <Divider />

      <Heading as="h4" size="md" mt={10}>
        List of Products
      </Heading>
      <Select placeholder="Select the Venue of products" mt={3} mb={3}>
        <option value="option1">Option 1</option>
        <option value="option2">Option 2</option>
        <option value="option3">Option 3</option>
      </Select>

      <VStack mt={4} divider={<StackDivider />} spacing={4} align="stretch">
        <Card>
          <CardBody>
            <Flex alignItems="center">
              <Box>
                <Heading size="xs" textTransform="uppercase">
                  Sör
                </Heading>
                <Text pt="2" fontSize="sm">
                  1000Ft
                </Text>
              </Box>
              <Spacer />
              <IconButton icon={<DeleteIcon />} />
            </Flex>
          </CardBody>
        </Card>
      </VStack>
    </Layout>
  );
};

export default Products;
