import { Flex, Text } from "@chakra-ui/react";
import _ from "lodash";
import React from "react";
import BeverageIcon from "./BeverageIcon";

const SessionStateCard = ({ state }) => {
  const total = _.sumBy(state.consumptions, (c) => c.product.price * c.amount);

  const icons = _.uniq(state.consumptions.map((c) => c.product.icon));

  const beverageIcons = icons.map((icon) => {
    let amount = 0;
    state.consumptions
      .filter((c) => c.product.icon == icon)
      .forEach((c) => {
        amount += c.amount;
      });

    return {
      icon,
      amount,
    };
  });

  return (
    <Flex justifyContent="space-between" alignItems="center">
      <Flex flexDir="column">
        <Text as="b">{state.username}</Text>
        <Text as="samp">Total: {total} Ft</Text>
      </Flex>
      <Flex>
        {beverageIcons.map((beverage, i) => (
          <Text key={i} margin="auto 0.2rem">
            <BeverageIcon icon={beverage.icon} size="sm" /> {beverage.amount}
          </Text>
        ))}
      </Flex>
    </Flex>
  );
};

export default SessionStateCard;
