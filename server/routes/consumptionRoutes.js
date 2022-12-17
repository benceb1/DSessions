const express = require("express");
const router = express.Router();
const {
  getConsumptions,
  setConsumption,
} = require("../controllers/consumptionController");

router.get("/", getConsumptions);
router.post("/", setConsumption);

module.exports = router;
