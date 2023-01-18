import React, { useEffect, useState } from "react";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { Layout } from "../components";
import { useFormik } from "formik";
import { RegistrationFormValidation } from "../utils";
import { useMutation } from "@tanstack/react-query";
import { register } from "../api";
import useUserStore from "../hooks/useUserStore";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const { user, setUser } = useUserStore((state) => ({
    user: state.user,
    setUser: state.setUser,
  }));

  useEffect(() => {
    if (user) {
      navigate("../");
    }
  }, [user]);

  const createUserMutation = useMutation({
    mutationFn: register,
    onSuccess: (data) => {
      setUser(data);
    },
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      password: "",
      passwordCheck: "",
    },
    validationSchema: RegistrationFormValidation,
    onSubmit: (values, form) => {
      createUserMutation.mutate({
        name: values.name,
        password: values.password,
      });
      form.resetForm();
    },
  });

  return (
    <Layout>
      <Heading mt="1rem">Create Account</Heading>
      <Box as="form" onSubmit={formik.handleSubmit} mt="2rem">
        <VStack>
          <FormControl isInvalid={formik.touched.name && formik.errors.name}>
            <FormLabel>Name</FormLabel>
            <Input
              id="name"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
            />
            <FormErrorMessage>{formik.errors.name}</FormErrorMessage>
          </FormControl>
          <FormControl
            isInvalid={formik.touched.password && formik.errors.password}
          >
            <FormLabel>Password</FormLabel>
            <InputGroup>
              <Input
                id="password"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                type={showPassword ? "text" : "password"}
              />
              <InputRightElement>
                <IconButton
                  variant="ghost"
                  icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
                  h="1.75rem"
                  size="sm"
                  onClick={() =>
                    setShowPassword((showPassword) => !showPassword)
                  }
                />
              </InputRightElement>
            </InputGroup>
            <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
          </FormControl>
          <FormControl
            isInvalid={
              formik.touched.passwordCheck && formik.errors.passwordCheck
            }
          >
            <FormLabel>Password Again</FormLabel>
            <InputGroup>
              <Input
                id="passwordCheck"
                name="passwordCheck"
                value={formik.values.passwordCheck}
                onChange={formik.handleChange}
                type={showPassword ? "text" : "password"}
              />
              <InputRightElement>
                <IconButton
                  variant="ghost"
                  icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
                  h="1.75rem"
                  size="sm"
                  onClick={() =>
                    setShowPassword((showPassword) => !showPassword)
                  }
                />
              </InputRightElement>
            </InputGroup>
            <FormErrorMessage>{formik.errors.passwordCheck}</FormErrorMessage>
          </FormControl>

          {createUserMutation.error && (
            <Alert status="error">
              <AlertIcon />
              <AlertDescription>
                {createUserMutation.error.message}
              </AlertDescription>
            </Alert>
          )}

          <FormControl>
            <Button isLoading={createUserMutation.isLoading} type="submit">
              Register
            </Button>
          </FormControl>
          <Box pt={5}>
            <Text>
              Do you already have an account?{" "}
              <Link as={RouterLink} to="../login" color="teal.500" href="#">
                Sign In!
              </Link>
            </Text>
          </Box>
        </VStack>
      </Box>
    </Layout>
  );
};

export default Register;
