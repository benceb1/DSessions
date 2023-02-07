import { AddIcon, MinusIcon } from "@chakra-ui/icons";
import { Button, ButtonGroup, Flex, IconButton, Text } from "@chakra-ui/react";
import React from "react";
import BeverageIcon from "./BeverageIcon";

const StateCard = ({ consumption, changeAmount }) => (
  <Flex justifyContent="space-between" alignItems="center">
    <Flex flexDir="column">
      <Text fontSize="xl">
        <BeverageIcon
          icon={consumption.product.icon}
          margin="0 0.5rem 0 0"
          size="xl"
        />
        {consumption.product.name}
      </Text>
      <Text as="samp">Price: {consumption.product.price}Ft</Text>
    </Flex>

    <ButtonGroup isAttached variant="outline">
      <IconButton
        aria-label="Minus"
        icon={<MinusIcon />}
        onClick={(e) => {
          e.preventDefault();
          changeAmount(consumption.id, consumption.amount - 1);
        }}
      />
      <Button>{consumption.amount}</Button>
      <IconButton
        aria-label="Add"
        icon={<AddIcon />}
        onClick={(e) => {
          e.preventDefault();
          changeAmount(consumption.id, consumption.amount + 1);
        }}
      />
    </ButtonGroup>
  </Flex>
);

export default StateCard;
