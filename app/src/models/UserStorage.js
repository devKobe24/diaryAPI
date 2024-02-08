"use strict";

const { resolve } = require("url");
const db = require("../config/db");
const { rejects } = require("assert");

class UserStorage {
  static #getAllDiaryData(data, id, userName) {
    const diaryData = JSON.parse(data);

    const diaryIdIndex = diaryData.id.indexOf(id);
    // const userNameIndex = diaryData.userName.indexOf(userName);

    const keys = Object.keys(diaryData);
    const diaryInfo = keys.reduce((newDiary, info) => {
      newDiary[info] = diaryData[info][diaryIdIndex];
      // newDiary[info] = diaryData[info][userNameIndex];
      // console.log(newDiary[info]);
      console.log(newDiary);
      // console.log(info);
      return newDiary;
    }, {});
    return diaryInfo;



    // const diaryInfo = {
    //   id: diaryData.id,
    //   userName: diaryData.userName,
    //   date: diaryData.date,
    //   title: diaryData.title,
    //   content: diaryData.content
    //   }
    //   return diaryInfo;
  }

  static getSpecificDiaryInfo(id) {
    return new Promise((resolve, rejects) => {
      db.query("SELECT * FROM diary WHERE id = ?", [id], (err, data) => {
        if (err) rejects(err);
        resolve(data[0]);
      });
    });
  }
  
  static getAllDiaryData() {
    return new Promise((resolve, rejects) => {
      db.query("SELECT * FROM diary", (err, data) => {
        if (err) rejects(err);
        resolve(data);
      });
    });
  }

  static getUsersData(...fields) {
    // const diaryData = this.#diaryData;
    const newUsers = fields.reduce((newUsers, field) => {
      if (diaryData.hasOwnProperty(field)) {
        newUsers[field] = diaryData[field];
      }
      
      return newUsers;
    }, {});
    return newUsers;
  }

  static validateId(id) {
    // const diaryData = this.#diaryData;
    const idx = diaryData.id.indexOf(id)
    const objectKeysForValidation = Object.keys(diaryData) // => [id, userName, date, title, content]
    const diaryInfo = objectKeysForValidation.reduce((newUser, info) => {
      newUser[info] = diaryData[info][idx];
      return newUser;
    }, {});
    return diaryInfo;
  }

  static save(data) {
    // const diaryData = this.#diaryData;
    diaryData.id.push(data.id);
    diaryData.userName.push(data.userName);
    diaryData.date.push(data.date);
    diaryData.title.push(data.title);
    diaryData.content.push(data.content);
    return { success: true };
  }
}

module.exports = UserStorage;