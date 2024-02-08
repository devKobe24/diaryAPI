"use strict";

const diaryData = {
  id: ["1", "2", "3"],
  userName: ["a", "b", "c"],
  date: ["2024-03-08 08:46:00", "2024-03-08 08:46:00", "2024-03-08 08:46:00"],
  title: ["title1", "title2", "title3"],
  content: ["content1", "content2", "content3"]
};

const output = {
  home: (req, res) => {
    res.render("home/index");
  },
  diary: (req, res) => {
    res.send(diaryData);
  },
};

const process = {
  diary: (req, res) => {
    const id = req.body.id,
      userName = req.body.userName,
      date = req.body.date,
      title = req.body.title,
      content = req.body.content;

      const response = {};
      if (diaryData.id.includes(id)) {
        response.success = true;
        return res.json(response);
      }

      response.success = false;
      response.msg = "Invalid User Id";
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