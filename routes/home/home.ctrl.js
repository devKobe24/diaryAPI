"use strict";

// ECMAScript 문법
const home = (req, res) => {
  res.render("home/index");
};

const diary = (req, res) => {
  res.render("home/diary");
};

module.exports = {
  home,
  diary,
};

// object는 key: value 형태로 구성되어 있다.
// 위처럼 key 만 입력하게 될 경우 value도 key와 같은 값으로 동일하게 취급된다.
/*
module.exports = {
  home: home,
  diary: diary
};
*/