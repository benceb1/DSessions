const asyncHandler = require("express-async-handler");
const uuid = require("uuid");
const Session = require("../models/sessionModel");

const getSessions = asyncHandler(async (req, res) => {
  const sessions = await Session.find();

  res.status(200).json(sessions);
});

const addSession = asyncHandler(async (req, res) => {
  const { venueId, ownerId } = req.body;

  if (!venueId || !ownerId) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  const session = await Session.create({
    venue: venueId,
    owner: ownerId,
    code: uuid.v4(),
    from: new Date(),
    totalPrice: 0,
    closed: false,
  });

  if (session) {
    res.status(201).json({
      _id: session.id,
      venue: session.venue,
      owner: session.owner,
      code: session.code,
      from: session.from,
      totalPrice: session.totalPrice,
      close: session.close,
    });
  } else {
    res.status(400);
    throw new Error("Invalid session data");
  }
});

const closeSession = asyncHandler(async (req, res) => {
  const session = await Session.findById(req.params.id);

  if (!session) {
    res.status(400);
    throw new Error("session not found");
  }
  // TODO: calculate total price
  let total = 100000;
  const updatedSession = await Session.findByIdAndUpdate(
    req.params.id,
    { closed: true, to: new Date(), totalPrice: total },
    {
      new: true,
    }
  );

  res.status(200).json(updatedSession);
});

const deleteSession = asyncHandler(async (req, res) => {
  const session = await Session.findById(req.params.id);

  if (!session) {
    res.status(400);
    throw new Error("session not found");
  }

  await session.remove();

  res.status(200).json({ id: req.params.id });
});

// getSession
// JoinSession

/**
 * getConsumptions
 * - byUser
 * - bySession (ebből már le lehet osztani userekre)
 * - talán get all
 */

module.exports = {
  addSession,
  getSessions,
  closeSession,
  deleteSession,
};
