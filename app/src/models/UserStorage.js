"use strict";

class UserStorage {
  static #diaryData = {
    id: ["1", "2", "3"],
    userName: ["a", "b", "c"],
    date: ["2024-03-08 08:46:00", "2024-03-08 08:46:00", "2024-03-08 08:46:00"],
    title: ["title1", "title2", "title3"],
    content: ["content1", "content2", "content3"]
  };

  static getAllDiaryData() {
    return this.#diaryData
  }

  static getUsersData(...fields) {
    const diaryData = this.#diaryData;
    const newUsers = fields.reduce((newUsers, field) => {
      if (diaryData.hasOwnProperty(field)) {
        newUsers[field] = diaryData[field];
      }
      
      return newUsers;
    }, {});
    return newUsers;
  }
}

module.exports = UserStorage;