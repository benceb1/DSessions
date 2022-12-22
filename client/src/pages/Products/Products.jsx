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
  InputAdornment,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  getVenues,
  addProduct,
  getProductsByVenue,
  deleteProduct,
} from "@/api";
import { useFormik } from "formik";
import * as yup from "yup";
import { IconList, MyIconComponent } from "@/utils/icons";

const Products = () => {
  const smDevice = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const [venues, setVenues] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedVenue, setSelectedVenue] = useState("");
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    getVenues().then(({ data }) => {
      setVenues(data);
    });
  }, []);

  useEffect(() => {
    if (selectedVenue._id) {
      getProductsByVenue(selectedVenue._id).then(({ data }) =>
        setProducts(data)
      );
    }
  }, [selectedVenue]);

  const validationSchema = yup.object({
    name: yup.string("Enter the name of venue").required("Name is required"),
    price: yup
      .string("Enter the amount of price")
      .required("Price is required"),
    venue: yup.string("Select the venue").required("Venue is required"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      price: "",
      icon: IconList[0].name,
      venue: venues.length > 0 ? venues[0]._id : "",
    },
    validationSchema: validationSchema,
    onSubmit: async (prod, actions) => {
      try {
        const { data } = await addProduct(prod);
        setProducts((products) => [...products, data]);
        actions.resetForm();
      } catch (e) {
        actions.setErrors({ server: e.response.data.message });
      }
    },
  });

  const handleDelete = (id) => {
    const res = confirm("Are you sure you want to delete it?");
    if (res) {
      deleteProduct(id).then(() => {
        setProducts((products) =>
          products.filter((product) => product._id != id)
        );
      });
    }
  };

  return (
    <FlexMidWrapper>
      {/** FORM */}
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
            <Box width="100%">
              <Box sx={{ padding: "0.5rem", width: "100%" }}>
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
              <Box sx={{ padding: "0.5rem", width: "100%" }}>
                <TextField
                  id="price"
                  type="number"
                  name="price"
                  size="small"
                  fullWidth
                  label="Price"
                  variant="outlined"
                  value={formik.values.price}
                  onChange={formik.handleChange}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">Ft</InputAdornment>
                    ),
                  }}
                  error={formik.touched.price && Boolean(formik.errors.price)}
                  helperText={formik.touched.price && formik.errors.price}
                />
              </Box>
              <Box sx={{ padding: "0.5rem", width: "100%" }}>
                <TextField
                  select
                  size="small"
                  fullWidth
                  id="venue"
                  name="venue"
                  label="Venue"
                  value={formik.values.venue}
                  onChange={formik.handleChange}
                  error={formik.touched.venue && Boolean(formik.errors.venue)}
                  helperText={formik.touched.venue && formik.errors.venue}
                >
                  {venues.map(({ name, _id }, i) => (
                    <MenuItem key={i} value={_id}>
                      {name}
                    </MenuItem>
                  ))}
                </TextField>
              </Box>
              <Box sx={{ padding: "0.5rem", width: "100%" }}>
                <TextField
                  select
                  size="small"
                  id="icon"
                  name="icon"
                  label="Icon"
                  value={formik.values.icon}
                  onChange={formik.handleChange}
                >
                  {IconList.map(({ name }, i) => (
                    <MenuItem key={i} value={name}>
                      <MyIconComponent name={name} />
                    </MenuItem>
                  ))}
                </TextField>
              </Box>
              {formik.errors.server ? <div>{formik.errors.server}</div> : null}
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

      {/** SELECT */}
      <Box padding="0.5rem" width={smDevice ? "100%" : "400px"}>
        <Typography variant="h5" gutterBottom>
          The list of products of the selected location
        </Typography>
        <TextField
          select
          size="small"
          fullWidth
          id="venue"
          name="venue"
          label="Venue"
          value={selectedVenue}
          onChange={(e) => setSelectedVenue(e.target.value)}
        >
          {venues.map((venue, i) => (
            <MenuItem key={i} value={venue}>
              {venue.name}
            </MenuItem>
          ))}
        </TextField>
      </Box>

      {/** PRODUCTS LIST */}
      {products.map(({ name, icon, venue, price, _id }, i) => (
        <Paper
          key={i}
          variant="outlined"
          sx={{
            padding: "0.5rem",
            width: smDevice ? "100%" : "400px",
            margin: "0.5rem",
          }}
        >
          <Box display="flex" justifyContent="space-between">
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <Typography variant="caption" display="block">
                  {venues.filter((v) => v._id == venue)[0].name}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Box display="flex" alignItems="center">
                  <MyIconComponent large name={icon} />
                  <Typography margin="0 0.5rem" variant="h4">
                    {`${name} - ${price}Ft`}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
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

export default Products;
