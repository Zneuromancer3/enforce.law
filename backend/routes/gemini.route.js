const express = require("express");
const { getLawResponse } = require("../gemini");

const router = express.Router();

// POST route to handle law queries
router.post("/query-law", getLawResponse);

module.exports = router;
