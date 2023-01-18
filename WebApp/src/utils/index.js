import { RegistrationFormValidation } from "./formValidations";

const colors = [
  "gray",
  "red",
  "orange",
  "yellow",
  "green",
  "teal",
  "blue",
  "cyan",
  "purple",
  "pink",
];

export function randomColor(intensity) {
  let index = Math.floor(Math.random() * colors.length);
  return `${colors[index]}.${intensity}`;
}

export { RegistrationFormValidation };
