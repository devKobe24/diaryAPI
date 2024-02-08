"use strict";

const Diary = require("../../models/Diary");

const output = {
  home: (req, res) => {
    res.render("home/index");
  },
  diary: (req, res) => {
    res.send(UserStorage.getAllDiaryData());
  },
};

const process = {
  diary: (req, res) => {
    const diaryInfo = new Diary(req.body);
    const response = diaryInfo.getDiaryInfo();
    console.log(response);
    return res.json(response);
  }
};


module.exports = {
  output,
  process,
};

// object는 key: value 형태로 구성되어 있다.
// 위처럼 key 만 입력하게 될 경우 value도 key와 같은 값으로 동일하게 취급된다.
/*
module.exports = {
  home: home,
  diary: diary
};
*/