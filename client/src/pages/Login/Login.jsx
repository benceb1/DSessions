import {
  Box,
  Button,
  Paper,
  TextField,
  useMediaQuery,
  CircularProgress,
} from "@mui/material";
import FlexMidWrapper from "@/components/FlexMidWrapper";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { login, reset } from "@/features/auth/authSlice";
import { useFormik } from "formik";
import * as yup from "yup";
import { useEffect } from "react";

const Login = () => {
  const smDevice = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    if (isSuccess) {
      navigate("/");
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const validationSchema = yup.object({
    name: yup.string("Enter the name").required("Name is required"),
    password: yup.string("Enter the password").required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (user, actions) => {
      dispatch(login(user));
    },
  });

  return (
    <FlexMidWrapper>
      <Paper
        variant="outlined"
        component="form"
        onSubmit={formik.handleSubmit}
        sx={{
          padding: "1rem",
          width: smDevice ? "100%" : "450px",
          margin: "0.5rem",
        }}
      >
        <Box sx={{ margin: "0.5rem 0" }}>
          <TextField
            id="name"
            name="name"
            size="small"
            fullWidth
            label="Name"
            variant="outlined"
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />
        </Box>
        <Box sx={{ margin: "0.5rem 0" }}>
          <TextField
            id="password"
            name="password"
            size="small"
            fullWidth
            label="Password"
            variant="outlined"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
        </Box>

        <Button type="submit" variant="outlined">
          {isLoading && (
            <CircularProgress
              size={24}
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                marginTop: "-12px",
                marginLeft: "-12px",
              }}
            />
          )}
          Login
        </Button>
      </Paper>
    </FlexMidWrapper>
  );
};

export default Login;
