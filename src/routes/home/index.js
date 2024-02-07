"use strict";

const express = require("express");
const router = express.Router();

const ctrl = require("./home.ctrl")

router.get("/", ctrl.home);
router.get("/diary", ctrl.diary);

module.exports = router;
