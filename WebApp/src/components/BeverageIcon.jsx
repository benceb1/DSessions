import {
  faBeer,
  faBlender,
  faCoffee,
  faFlask,
  faGlassWhiskey,
  faMugHot,
  faWineGlassAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const BeverageIcon = ({ icon, margin, ...props }) => {
  if (!iconTypes.includes(icon))
    // fallback icon
    return (
      <FontAwesomeIcon icon={faFlask} style={{ margin: margin }} {...props} />
    );

  return (
    <FontAwesomeIcon
      icon={selectedIcon(icon)}
      style={{ margin: margin }}
      {...props}
    />
  );
};

export default BeverageIcon;

function selectedIcon(icon) {
  switch (icon) {
    case "wine":
      return faWineGlassAlt;
    case "tea":
      return faMugHot;
    case "whiskey":
      return faGlassWhiskey;
    case "coffee":
      return faCoffee;
    case "beer":
      return faBeer;
    case "blender":
      return faBlender;
    default:
      return faFlask;
  }
}

export const iconTypes = [
  "wine",
  "tea",
  "whiskey",
  "coffee",
  "beer",
  "blender",
];

// size - lg, sm .....
// fontSize
