const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

const mainElement = document.querySelector("main");

const getNewPokemon = trainerID => {
    return fetch(POKEMONS_URL, { 
        method: "POST", 
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({trainer_id: trainerID})
    }).then(resp => resp.json()); 
}
const getAllTrainers = () => {
    return fetch()
}


const renderTrainerCard = (trainer) =>  {
    const mainDiv = document.querySelector("main");

    const card = document.createElement("div");
    const p = document.createElement("p");
    const addBtn = document.createElement("button");
    const list = createPokemonList(trainer.pokemons);

    card.className = "card";
    p.innerText = trainer.name;
    addBtn.innerText = "Add Pokemon";

    addBtn.addEventListener('click', () => getNewPokemon(trainer.id))
    card.append(p, addBtn, list);
    mainDiv.append(card);
};

const createPokemonList = pokemonsArr => { 
    const list = docunment.createElement('ul')
    const pokemonLiList = pokemonsArr.map(pokemon => createPokemonElem(pokemon));
    const li = createPokemonElem(pokemon)
    list.append(li)

    list.append(...pokemonLiList)
    return list; 
};

const createPokemonElem = pokemon => {
    const li = docunment.createElement('li')
    const releaseBtn = docunment.createElement('button')

    releaseBtn.innerText = 'Release'
    releaseBtn.className = 'release'

    releaseBtn.addEventListener('click', () => li.remove()); 
    li.innerText = `${pokemon.nickname}  (${pokemon.species})`
    li.append(releaseBtn)
    return li
}







// function makeTrainerCard() {
// 	fetch(TRAINERS_URL)
// 		.then(response => response.json())
// }

// function postTrainer(){
//     fetch(TRAINERS_URL)
//     .then(data  => data.json())
//     .then(fetchTrainers);
// }

// function fetchTrainers(trainerObj){
//     for (let i = 0; i < trainerObj.length; i++){
//         createTrainer(trainerObj[i])
//     }
// }

// function createTrainer(trainer) {
//     const main = document.querySelector("main")
//     const div = document.createElement("div")
//     div.classList.add("card")
//     div.setAttribute("data-id", trainer.id)
//     const p = document.createElement("p")
//     p.innerText = trainer.name
//     div.append(p);


//     const button = document.createElement("button")
//     button.setAttribute("data-trainer-id", trainer.id)
//     button.innerText = "Add Pokemon"
//     button.addEventListener("click", function() {
//         addPokemon(trainer.id);
//     })
//         div.append(button)

//         const ul = docunment.createElement("ul")

// }



