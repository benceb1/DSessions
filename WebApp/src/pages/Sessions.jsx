import React from "react";
import {
  Card,
  CardBody,
  CardFooter,
  Flex,
  StackDivider,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { getUserClosedSessions } from "../api";
import { Layout } from "../components";
import useUserStore from "../hooks/useUserStore";

const Sessions = () => {
  const navigate = useNavigate();
  const user = useUserStore((state) => state.user);

  const closedSessions = useQuery({
    queryKey: ["closedSessions"],
    enabled: user !== null && user !== undefined,
    queryFn: getUserClosedSessions,
  });

  const handleNavigateToSummary = (id) => {
    navigate(`../summary/${id}`);
  };

  return (
    <Layout>
      <VStack
        divider={<StackDivider borderColor="gray.200" />}
        spacing={4}
        align="stretch"
      >
        {closedSessions.data?.map((data, i) => (
          <Card
            _hover={{
              fontWeight: "semibold",
              opacity: 0.9,
            }}
            key={i}
            onClick={() => handleNavigateToSummary(data.id)}
          >
            <CardBody>
              <Flex justifyContent="space-between">
                <Text fontSize="2xl">{data.venue.name}</Text>
                <Text fontSize="2xl">code: {data.code}</Text>
              </Flex>
            </CardBody>
            <CardFooter>
              <Text>
                {new Date(data.createdDate).toLocaleDateString("hu-HU")}
              </Text>
            </CardFooter>
          </Card>
        ))}
      </VStack>
    </Layout>
  );
};

export default Sessions;
