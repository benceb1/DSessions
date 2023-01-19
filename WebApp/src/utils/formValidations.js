import * as Yup from "yup";

export const RegistrationFormValidation = Yup.object({
  name: Yup.string()
    .max(20, "Must be 20 characters or less")
    .required("Required"),
  password: Yup.string().required("Password is required"),
  passwordCheck: Yup.string()
    .required("Confirmation password is required")
    .oneOf([Yup.ref("password"), null], "Passwords must match"),
});

export const LoginFormValidation = Yup.object({
  name: Yup.string()
    .max(20, "Must be 20 characters or less")
    .required("Required"),
  password: Yup.string().required("Password is required"),
});

export const VenueFormValidation = Yup.object({
  name: Yup.string()
    .max(20, "Must be 20 characters or less")
    .required("Required"),
});

export const ProductFormValidation = Yup.object({
  name: Yup.string()
    .max(20, "Must be 20 characters or less")
    .required("Required"),
  venue: Yup.string().required("Required"),
  icon: Yup.string().required("Required"),
  price: Yup.number().required("Required"),
});
