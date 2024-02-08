"use strict";

const id = document.querySelector("#id"),
  userName = document.querySelector("#userName"),
  date = document.querySelector("#date"),
  title = document.querySelector("#title"),
  content = document.querySelector("#content");

function diary() {
  const req = {
    id: id.value,
    userName: userName.value,
    date: date.value,
    title: title.value,
    content: content.value
  };

  fetch("/diary", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(req),
  })
  .then((res) => res.json())
  .then(console.log);
};


