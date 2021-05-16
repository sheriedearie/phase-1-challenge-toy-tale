let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

const URL = "http://localhost:3000/toys"

function getToys(){
  fetch(URL)
  .then(res => res.json())
  .then(toyArry => toyArry.forEach(toy => renderToy (toy)))
  }

function renderToy(){
  let toyCollection = document.getElementById("toy-collection")
}