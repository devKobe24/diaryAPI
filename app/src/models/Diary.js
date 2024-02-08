"use strict";

const UserStorage = require("./UserStorage");

class Diary {
  constructor(body) {
    this.body = body;
  }
  //getDiaryInfo
  getDiaryInfo() {
    const body = this.body
    const { id } = UserStorage.validateId(body.id);
    if (id) {
      if (id === body.id) {
        return { success: true };
      }
      return { success: false, msg: "Invalid Diary Id." };
    }
  }
}

module.exports = Diary;