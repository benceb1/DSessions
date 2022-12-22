import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import {
  Box,
  Divider,
  Grid,
  Paper,
  TextField,
  useMediaQuery,
  Button,
  Typography,
  IconButton,
  MenuItem,
  ButtonGroup,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { SPORTS_BAR } from "@/utils/constants";
import { IconList, MyIconComponent } from "@/utils/icons";
import SessionProductItem from "../../components/SessionProductItem";

const ManageProductsSection = () => {
  const smDevice = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  return (
    <>
      {/* FORM */}
      <Box
        padding="0.5rem 0"
        display="flex"
        justifyContent="space-between"
        flexDirection={smDevice ? "column" : "row"}
        width={smDevice ? "100%" : "450px"}
      >
        <Box padding="0.5rem" sx={{ width: "100%" }}>
          <TextField
            select
            id="product"
            name="product"
            size="small"
            fullWidth
            label="Product"
            variant="outlined"
            value=""
          >
            {dummyProductList.map(({ _id, name, icon, price }, i) => (
              <MenuItem key={i} value={_id}>
                <MyIconComponent name={icon} />
                {` ${name} - ${price}Ft`}
              </MenuItem>
            ))}
          </TextField>
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
      <Divider
        orientation="horizontal"
        sx={{ mr: "-1px", width: smDevice ? "100%" : "450px" }}
      />

      {/* LIST OF OUR PRODUCTS */}
      {dummyProductList.map((prod, i) => (
        <SessionProductItem key={i} />
      ))}

      <Box padding="0.5rem 0" width={smDevice ? "100%" : "450px"}>
        <Typography variant="h5">Your Total: 100000000000Ft</Typography>
      </Box>
    </>
  );
};

export default ManageProductsSection;

const dummyProductList = [
  {
    _id: 1,
    name: "Beer",
    price: 1000,
    icon: SPORTS_BAR,
  },
  {
    _id: 2,
    name: "Beer",
    price: 1000,
    icon: SPORTS_BAR,
  },
];
