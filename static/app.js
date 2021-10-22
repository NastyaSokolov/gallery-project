"use strict";
// variables and DOM
const spinner = document.querySelector(".spinner-border");
let pictureList = document.querySelector(".list-group");
const hid = [...document.querySelectorAll(".hid")];
const nopic = document.querySelector(".no_pic");
let imgArray = [...document.querySelectorAll(".art_img")];
let popImg = document.querySelector(".popup img");
const popup = document.querySelector(".popup");
const close = document.querySelector(".close");
const editBtnArr = [...document.querySelectorAll(".btn-edit")];
// Functions
const init = () => {
  if (nopic) {
    spinner.style.display = "none";
  } else {
    // Event-listeners
    close.addEventListener("click", () => {
      popup.style.display = "none";
    });

    imgArray.forEach((pic) => {
      pic.style.display = "block";
      spinner.style.display = "none";
      // };
    });

    imgArray.forEach((image) => {
      image.addEventListener("click", (e) => {
        popImg.src = e.target.dataset.src;
        popup.style.display = "block";
        popup.style.opacity = 1;
      });
    });
    editBtnArr.forEach((btn) =>
      btn.addEventListener("click", (e) => {
        let id = e.target.value;
        console.log(id);
        fetch(`/edit/${id}`, { method: "DELETE" }).then(() => {
          location.reload();
        });
      })
    );
  }
};
init();
