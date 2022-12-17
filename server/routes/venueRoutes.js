const express = require("express");
const router = express.Router();
const {
  addVenue,
  getVenues,
  deleteVenue,
} = require("../controllers/venueController");

router.get("/", getVenues);
router.post("/", addVenue);
router.delete("/:id", deleteVenue);

module.exports = router;
