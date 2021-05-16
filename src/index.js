// let addToy = false;
// const toyColl = document.getElementById("toy-collection")
// const URL = "http://localhost:3000/toys"

// document.addEventListener("DOMContentLoaded", () => {
//   const addBtn = document.querySelector("#new-toy-btn");
//   const toyFormContainer = document.querySelector(".container");
//   addBtn.addEventListener("click", () => {
//     // hide & seek with the form
//     addToy = !addToy;
//     if (addToy) {
//       toyFormContainer.style.display = "block";
//     } else {
//       toyFormContainer.style.display = "none";
//     }
//   });
// });

// // fetch(allToys, {method: "GET"
// // })

// // .then(response => response.json())
// // .then(toys => {
// //   toys.forEach(function(toy){
// //     toyColl.innerHTML += `<div class="card">
// //                               <h2>${toy.name}</h2>
// //                               <img src="${toy.image}" class="toy-avatar" />
// //                               <p>${toy.likes} </p>
// //                               <button class="like-btn" id="[toy_id]">Like <3</button>
// //                               </div>`
// //   })
// // })

// function getToys(){
//   rturn fetch('http://localhost:3000/toys')
//   .then(res => res.json())
//   // .then(toys => {
//   //   toys.forEach(function(toy))
//   }
//   // .then(toyArray => toyArray.forEach(toy => renderToy (toy)))
// //   }

// // function renderToy(toy){
// toyColl.innerHTML += `<div class="card">
//                           <h2>${toy.name}</h2>
//                           <img src="${toy.image}" class="toy-avatar" />
//                           <p>${toy.likes} </p>
//                           <button class="like-btn" id="[toy_id]">Like <3</button>
//                           </div>`
// }
// console.log(toyColl)

const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false
let divCollect = document.querySelector('#toy-collection')
// grab the values that are needed from the html

function getToys() {
  return fetch('http://localhost:3000/toys')
    .then(res => res.json())
}

function postToy(toy_data) {
  fetch('http://localhost:3000/toys', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: "application/json"
      },
      body: JSON.stringify({
        "name": toy_data.name.value,
        "image": toy_data.image.value,
        "likes": 0
        // grab the value of the toy 

      })
    })
    .then(res => res.json())
    .then((obj_toy) => {
      let new_toy = renderToys(obj_toy)
      divCollect.append(new_toy)
    })
}

function likes(e) {
  e.preventDefault()
  let more = parseInt(e.target.previousElementSibling.innerText) + 1

  fetch(`http://localhost:3000/toys/${e.target.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"

      },
      body: JSON.stringify({
        "likes": more
      })
    })
    .then(res => res.json())
    .then((like_obj => {
      e.target.previousElementSibling.innerText = `${more} likes`;
    }))
}

function renderToys(toy) {
  let h2 = document.createElement('h2')
  h2.innerText = toy.name

  let img = document.createElement('img')
  img.setAttribute('src', toy.image)
  img.setAttribute('class', 'toy-avatar')

  let p = document.createElement('p')
  p.innerText = `${toy.likes} likes`

  let btn = document.createElement('button')
  btn.setAttribute('class', 'like-btn')
  btn.setAttribute('id', toy.id)
  btn.innerText = "like"
  btn.addEventListener('click', (e) => {
    console.log(e.target.dataset);
    likes(e)
  })

  let divCard = document.createElement('div')
  divCard.setAttribute('class', 'card')
  divCard.append(h2, img, p, btn)
  divCollect.append(divCard)
}


// add listener to 'Add Toy' button to show or hide form
addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    toyForm.addEventListener('submit', event => {
      event.preventDefault()
      postToy(event.target)
    })
  } else {
    toyForm.style.display = 'none'
  }
})

// start by getting all toys

getToys().then(toys => {
  toys.forEach(toy => {
    //function to render toys goes here or something
    renderToys(toy)
  })
})