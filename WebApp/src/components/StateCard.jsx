import { AddIcon, MinusIcon } from "@chakra-ui/icons";
import { Button, ButtonGroup, Flex, IconButton, Text } from "@chakra-ui/react";
import React from "react";
import BeverageIcon from "./BeverageIcon";

const StateCard = () => {
  return (
    <Flex justifyContent="space-between" alignItems="center">
      <Flex flexDir="column">
        <Text fontSize="xl">
          <BeverageIcon icon="beer" margin="0 0.5rem 0 0" size="xl" />
          Sör
        </Text>
        <Text as="samp">Price: 920Ft</Text>
      </Flex>

      <ButtonGroup isAttached variant="outline">
        <IconButton aria-label="Add" icon={<AddIcon />} />
        <Button>3</Button>
        <IconButton aria-label="Minus" icon={<MinusIcon />} />
      </ButtonGroup>
    </Flex>
  );
};

export default StateCard;
