import LocalDrinkIcon from "@mui/icons-material/LocalDrink";
import SportsBarIcon from "@mui/icons-material/SportsBar";
import EmojiFoodBeverageIcon from "@mui/icons-material/EmojiFoodBeverage";
import WineBarIcon from "@mui/icons-material/WineBar";
import LocalBarIcon from "@mui/icons-material/LocalBar";
import {
  LOCAL_DRINK,
  SPORTS_BAR,
  FOOD_BEVERAGE,
  WINE_BAR,
  LOCAL_BAR,
} from "./constants";

export const IconList = [
  {
    name: LOCAL_DRINK,
    Component: LocalDrinkIcon,
  },
  {
    name: SPORTS_BAR,
    Component: SportsBarIcon,
  },
  {
    name: FOOD_BEVERAGE,
    Component: EmojiFoodBeverageIcon,
  },
  {
    name: WINE_BAR,
    Component: WineBarIcon,
  },
  {
    name: LOCAL_BAR,
    Component: LocalBarIcon,
  },
];

export const MyIconComponent = ({ name, large }) => {
  const Component = IconList.filter((i) => i.name == name)[0].Component;
  return Component ? (
    <Component fontSize={large ? "large" : "inherit"} />
  ) : null;
};
