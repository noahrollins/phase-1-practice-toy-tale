let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

const toyCollection= document.querySelector("#toy-collection")

fetch('http://localhost:3000/toys')
  .then((res)=> res.json())
  .then((data) => {
    data.forEach(toy => newToyCard(toy));
})    


document.addEventListener("submit", (e)=>{
  e.preventDefault()
  const newToyName = document.querySelector(".input-text1").value
  const newToyImg = document.querySelector(".input-text2").value
  if((newToyName === "") && (newToyImg.value === "")){
    return ""
  } else if((newToyName != "") && (newToyImg != "")){
    fetch(`http://localhost:3000/toys`, {
      method: 'POST',
      headers: {
        'Content-Type': "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        "name": `${newToyName}`,
        "image": `${newToyImg}`,
        "likes": 0})
      })
      .then((response) => response.json())
      .then((data)=> newToyCard(data))
  }
})

function newToyCard(toy){
  const toyCard = document.createElement("div");
  const toyHeader = document.createElement("h2");
  let toyLikes = document.createElement("p");
  const toyImg = document.createElement("img");
  const toyButton = document.createElement("button")
  toyCard.className = "card"
  toyHeader.textContent = `${toy.name}`
  toyImg.src = `${toy.image}`
  toyImg.className = "toy-avatar"
  toyLikes.textContent = `${toy.likes} likes`
  toyButton.className = "like-btn"
  toyButton.id = `${toy.id}`
  toyButton.textContent = "Like ❤️"
  toyButton.addEventListener("click", ()=>{
      const newNumberOfLikes = ++toy.likes
      toyLikes.textContent = `${newNumberOfLikes} likes`


      fetch(`http://localhost:3000/toys/${toy.id}`,{
        method:'PATCH',
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
            "likes": newNumberOfLikes
        })
      })
  })
  toyCollection.appendChild(toyCard)
  toyCard.append(toyHeader, toyImg, toyLikes, toyButton);
} 
