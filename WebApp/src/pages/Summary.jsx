import {
  Box,
  Flex,
  StackDivider,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Text,
  Tfoot,
  Th,
  Thead,
  Tr,
  VStack,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import _ from "lodash";
import React from "react";
import { useParams } from "react-router-dom";
import { getConsumptionsBySession } from "../api";
import { Layout } from "../components";
import { separateStates } from "../utils";

const Summary = () => {
  let { sessionId } = useParams();

  const closedSessions = useQuery({
    queryKey: ["summary"],
    enabled: sessionId !== null && sessionId !== undefined,
    queryFn: () => getConsumptionsBySession(sessionId),
  });

  const separatedData = separateStates(closedSessions.data);

  let sessionTotalPrice = 0;

  separatedData.forEach((d) => {
    let userTotal = _.sumBy(d.consumptions, (c) => c.product.price * c.amount);

    sessionTotalPrice += userTotal;
  });

  return (
    <Layout>
      <VStack
        divider={<StackDivider borderColor="gray.300" />}
        spacing={4}
        align="stretch"
      >
        {separatedData.map((data, i) => {
          let userTotal = _.sumBy(
            data.consumptions,
            (c) => c.product.price * c.amount
          );
          return (
            <Flex key={i}>
              <Text as="b" w={100}>
                {data.username}
              </Text>
              <Box flex={1}>
                <TableContainer>
                  <Table variant="simple">
                    <Thead>
                      <Tr>
                        <Th>Product</Th>
                        <Th>Amount</Th>
                        <Th isNumeric>Price</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {data.consumptions.map((c, j) => (
                        <Tr key={j}>
                          <Td w={180}>{c.product.name}</Td>
                          <Td>{c.amount}</Td>
                          <Td isNumeric>{c.product.price * c.amount}</Td>
                        </Tr>
                      ))}
                    </Tbody>
                    <Tfoot>
                      <Tr>
                        <Th>Total:</Th>
                        <Th></Th>
                        <Th isNumeric>{userTotal}Ft</Th>
                      </Tr>
                    </Tfoot>
                  </Table>
                </TableContainer>
              </Box>
            </Flex>
          );
        })}

        <Flex justifyContent="space-between">
          <Text as="b">Total:</Text>
          <Text as="b">{sessionTotalPrice}Ft</Text>
        </Flex>
      </VStack>
    </Layout>
  );
};

export default Summary;
