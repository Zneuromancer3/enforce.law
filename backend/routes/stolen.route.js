const express = require("express")
const StolenItems = require("../models/stolen.model")
const router = express.Router();
const {getStolenItems, getStolenItem, createStolenItem, updateStolenItem, deleteStolenItem} = require("../controllers/stolen.controller");

//get all stolens
router.get('/', getStolenItems);

//get one Stolen
router.get("/:id", getStolenItem)

//add data
router.post("/", createStolenItem)

//update existing data
router.put("/:id" , updateStolenItem)

//delete existing data
router.delete("/:id", deleteStolenItem)

module.exports = router