import React, { useRef } from "react";
import {
  Box,
  Container,
  Flex,
  Heading,
  Spacer,
  IconButton,
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  VStack,
  StackDivider,
  Text,
  Center,
  Link,
  DrawerFooter,
  Button,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { Link as RouterLink } from "react-router-dom";
import { randomColor } from "../utils";
import useUserStore from "../hooks/useUserStore";

const Navbar = () => {
  const { user, logout } = useUserStore((state) => ({
    user: state.user,
    logout: state.logout,
  }));

  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();

  return (
    <>
      <Container maxW="container.lg" p={1}>
        <Flex minWidth="max-content" alignItems="center" gap="2">
          <Box p="2">
            <Heading as={RouterLink} to="/" size="lg">
              DSessions
            </Heading>
          </Box>
          <Spacer />
          <IconButton
            ref={btnRef}
            onClick={onOpen}
            variant="ghost"
            size="lg"
            icon={<HamburgerIcon />}
          />
        </Flex>
      </Container>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>{user ? `Hello, ${user.name}!` : "Menu"}</DrawerHeader>
          <DrawerBody>
            <VStack
              divider={<StackDivider borderColor={() => randomColor(100)} />}
              spacing={4}
              align="stretch"
            >
              {links.map(({ name, url }, i) => (
                <Center h="40px" key={i}>
                  <Link as={RouterLink} to={`../${url}`}>
                    <Text align="center" as="b">
                      {name}
                    </Text>
                  </Link>
                </Center>
              ))}
            </VStack>
          </DrawerBody>
          <DrawerFooter>
            {user ? (
              <Button margin="auto" variant="outline" onClick={() => logout()}>
                Logout
              </Button>
            ) : (
              <Button
                margin="auto"
                variant="outline"
                as={RouterLink}
                to="../login"
              >
                Login
              </Button>
            )}
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Navbar;

const links = [
  {
    name: "Venues",
    url: "venues",
  },
  {
    name: "Products",
    url: "products",
  },
  {
    name: "Sessions",
    url: "sessions",
  },
];
