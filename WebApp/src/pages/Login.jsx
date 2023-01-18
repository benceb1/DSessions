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
  VStack,
} from "@chakra-ui/react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { Layout } from "../components";
import useUserStore from "../hooks/useUserStore";
import { useMutation } from "@tanstack/react-query";
import { login, setAuthToken } from "../api";
import { useFormik } from "formik";
import { LoginFormValidation } from "../utils/formValidations";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

const Login = () => {
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

  const loginUserMutation = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      setUser(data);
    },
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      password: "",
    },
    validationSchema: LoginFormValidation,
    onSubmit: (values, form) => {
      loginUserMutation.mutate({
        name: values.name,
        password: values.password,
      });
      form.resetForm();
    },
  });

  return (
    <Layout>
      <Heading mt="1rem">Log In</Heading>
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

          {loginUserMutation.error && (
            <Alert status="error">
              <AlertIcon />
              <AlertDescription>
                {loginUserMutation.error.message}
              </AlertDescription>
            </Alert>
          )}

          <FormControl>
            <Button isLoading={loginUserMutation.isLoading} type="submit">
              Login
            </Button>
          </FormControl>
          <Box pt={5}>
            New to us?{" "}
            <Link as={RouterLink} to="../register" color="teal.500" href="#">
              Sign Up
            </Link>
          </Box>
        </VStack>
      </Box>
    </Layout>
  );
};

export default Login;
