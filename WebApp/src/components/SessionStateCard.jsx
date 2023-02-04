import { Flex, Text } from "@chakra-ui/react";
import React from "react";
import BeverageIcon from "./BeverageIcon";

const SessionStateCard = () => {
  return (
    <Flex justifyContent="space-between" alignItems="center">
      <Flex flexDir="column">
        <Text as="b">Valaki</Text>
        <Text as="samp">Total: 15430 Ft</Text>
      </Flex>
      <Flex>
        {[1, 2, 3].map((n, i) => (
          <Text key={i} margin="auto 0.2rem">
            <BeverageIcon icon="beer" size="sm" /> 4
          </Text>
        ))}
      </Flex>
    </Flex>
  );
};

export default SessionStateCard;
