import _ from "lodash";
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

export function separateStates(consumptions) {
  if (!consumptions) return [];

  const names = _.uniq(consumptions.map((c) => c.username));

  return names.map((name) => {
    let stateConsumptions = consumptions
      .filter((c) => name === c.username)
      .map(({ username, ...keep }) => keep);

    return {
      username: name,
      consumptions: stateConsumptions,
    };
  });
}

export { RegistrationFormValidation };
