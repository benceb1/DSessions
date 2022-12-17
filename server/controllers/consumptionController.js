const asyncHandler = require("express-async-handler");

const Consumption = require("../models/consumptionModel");

const getConsumptions = asyncHandler(async (req, res) => {
  const consumptions = await Consumption.find();

  res.status(200).json(consumptions);
});

const setConsumption = asyncHandler(async (req, res) => {
  const { userId, sessionId, productId } = req.body;

  if (!userId || !sessionId || !productId) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  // TODO: if session closed -> exit

  const consumption = await Consumption.findOne({
    user: userId,
    session: sessionId,
    product: productId,
  });

  if (consumption) {
    const updatedConsumption = await Consumption.findByIdAndUpdate(
      consumption._id,
      { quantity: consumption.quantity + 1 },
      {
        new: true,
      }
    );

    res.status(200).json(updatedConsumption);
  } else {
    const newConsumption = await Consumption.create({
      user: userId,
      session: sessionId,
      product: productId,
      quantity: 1,
    });

    if (newConsumption) {
      res.status(201).json({
        _id: session.id,
        user: session.user,
        session: session.session,
        product: session.product,
        quantity: session.quantity,
      });
    } else {
      res.status(400);
      throw new Error("Invalid consumption data");
    }
  }
});

module.exports = {
  getConsumptions,
  setConsumption,
};
