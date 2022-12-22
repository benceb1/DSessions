import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import FlexMidWrapper from "@/components/FlexMidWrapper";
import {
  Box,
  Divider,
  Paper,
  TextField,
  useMediaQuery,
  Button,
  Typography,
  IconButton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import StorefrontIcon from "@mui/icons-material/Storefront";
import DeleteIcon from "@mui/icons-material/Delete";
import { getVenues, deleteVenue, addVenue } from "@/api";
import { useFormik } from "formik";
import * as yup from "yup";

const Venues = () => {
  const smDevice = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const [venues, setVenues] = useState([]);

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    getVenues().then(({ data }) => setVenues(data));
  }, []);

  const validationSchema = yup.object({
    name: yup.string("Enter the name of venue").required("Name is required"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
    },
    validationSchema: validationSchema,
    onSubmit: async ({ name }, actions) => {
      try {
        const { data } = await addVenue(name);
        setVenues((venues) => [...venues, data]);
        actions.resetForm();
      } catch (e) {
        actions.setErrors({ name: e.response.data.message });
      }
    },
  });

  const handleDelete = (id) => {
    const res = confirm("Are you sure you want to delete it?");
    if (res) {
      deleteVenue(id).then(() => {
        setVenues((venues) => venues.filter((venue) => venue._id != id));
      });
    }
  };

  return (
    <FlexMidWrapper>
      {user && (
        <>
          <Box
            p="0 0 1rem 0"
            display="flex"
            justifyContent="space-between"
            flexDirection={smDevice ? "column" : "row"}
            width={smDevice ? "100%" : "400px"}
            component="form"
            onSubmit={formik.handleSubmit}
          >
            <Box padding="0.5rem" sx={{ width: "100%" }}>
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
            <Button
              startIcon={<AddIcon />}
              variant="contained"
              sx={{
                margin: smDevice ? "auto 0.5rem" : "0.65rem auto auto auto",
              }}
              type="submit"
            >
              Add
            </Button>
          </Box>

          <Divider orientation="horizontal" flexItem sx={{ mr: "-1px" }} />
        </>
      )}
      {venues.map(({ name, _id }, i) => (
        <Paper
          key={i}
          variant="outlined"
          sx={{
            padding: "1rem",
            width: smDevice ? "100%" : "400px",
            margin: "1rem",
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <StorefrontIcon fontSize="large" />
              <Typography sx={{ margin: "0 0.5rem" }} variant="h4">
                {name}
              </Typography>
            </Box>
            {user && (
              <IconButton onClick={() => handleDelete(_id)} size="large">
                <DeleteIcon fontSize="inherit" />
              </IconButton>
            )}
          </Box>
        </Paper>
      ))}
    </FlexMidWrapper>
  );
};

export default Venues;
