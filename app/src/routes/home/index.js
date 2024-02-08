"use strict";

const express = require("express");
const router = express.Router();

const ctrl = require("./home.ctrl")

router.get("/", ctrl.output.home);
router.get("/diary", ctrl.output.diary);

router.post("/regist", ctrl.process.registDiary);
router.post("/diary", ctrl.process.diary);

module.exports = router;
