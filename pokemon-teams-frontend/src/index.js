const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`



document.addEventListener('DOMContentLoaded', (event) => {
  
   loadCards()
});




function loadCards() {
    let x = fetch(TRAINERS_URL).then(resp => resp.json()).then(data => displayTrainers(data))
    console.log(x)
};


function displayTrainers(data) {

  console.log(data)
    
  data.forEach(trainer => {
    let pokeul = document.createElement('ul')
    let cardDiv = document.createElement('div')
    cardDiv.classList.add('card')
    cardDiv.id = trainer.id

// trainer name 
    let trainerNameTag = document.createElement('p')
    trainerNameTag.id = trainer.name
    
    let cardArea = document.querySelector('#main')
    cardArea.append(cardDiv)
    cardDiv.append(trainerNameTag)
    let nameTag =  document.querySelector(`#${trainer.name}`)
    nameTag.textContent = trainer.name

    // add pokemon button

    let addPokemon = document.createElement('button')
    addPokemon.textContent = "Add Pokemon"
    cardDiv.append(addPokemon)
    addPokemon.addEventListener('click', () => {
      fetch(POKEMONS_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ trainer_id: trainer.id })
      }).then(resp => resp.json()).then(new_poke => {
        let li = document.createElement('li')
        li.textContent = `${new_poke.nickname} (${new_poke.species})`
        releaseButton(new_poke, li)
        pokeul.append(li)
      })
    })

    // trainer's pokemons

    trainer.pokemons.forEach(p => {
      let li = document.createElement('li')
      li.textContent = `${p.nickname} (${p.species})`
      releaseButton(p, li)
      pokeul.append(li)
      cardDiv.append(pokeul)
      // debugger
    })

   // release button 
  //  let list = document.createElement('li')
   
    function releaseButton(pokemon, li) {
      let button = document.createElement('button')
      button.classList.add('release')
      button.textContent = "release"

      button.addEventListener('click', () => {
        fetch(`${POKEMONS_URL}/${pokemon.id}`, {
          method: "DELETE"
        })
        li.remove()
      })
      li.append(button)
    };
    
    cardDiv.append(pokeul)   
  });
}
