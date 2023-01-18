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
