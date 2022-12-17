const asyncHandler = require("express-async-handler");
const Venue = require("../models/venueModel");

const getVenues = asyncHandler(async (req, res) => {
  const venues = await Venue.find();

  res.status(200).json(venues);
});

const addVenue = asyncHandler(async (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  const venueExists = await Venue.findOne({ name });

  if (venueExists) {
    res.status(400);
    throw new Error("Venue already exists");
  }

  const venue = await Venue.create({
    name,
  });

  if (venue) {
    res.status(201).json({
      _id: venue.id,
      name: venue.name,
    });
  } else {
    res.status(400);
    throw new Error("Invalid venue data");
  }
});

const deleteVenue = asyncHandler(async (req, res) => {
  const venue = await Venue.findById(req.params.id);

  if (!venue) {
    res.status(400);
    throw new Error("Venue not found");
  }

  await venue.remove();

  res.status(200).json({ id: req.params.id });
});

module.exports = {
  addVenue,
  getVenues,
  deleteVenue,
};
