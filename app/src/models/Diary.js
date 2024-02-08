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
  
  // registeDiary
  registDiary() {
    const body = this.body;
    const response = UserStorage.save(body);
    return response;
  }

  // getAllDiaryData
  async getAllDiaryData() {
    const body = this.body
    // console.log(await UserStorage.getAllDiaryData());
    const response = await UserStorage.getAllDiaryData();
    return response;
  }

 getSpecificDiaryInfo() {
    const body = this.body
    const { id } = UserStorage.getSpecificDiaryInfo(body.id);
    console.log("id==============>>>>>>>>>",id);
    if (id) {
      if (id === body.id) {
        return { success: true };
      }
      return { success: false, msg: "Invalid Id."}
    }
  }
}

module.exports = Diary;