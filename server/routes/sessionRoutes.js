const express = require("express");
const router = express.Router();
const {
  getSessions,
  addSession,
  closeSession,
} = require("../controllers/sessionController");

router.get("/", getSessions);
router.post("/", addSession);
router.put("/:id", closeSession);

module.exports = router;
