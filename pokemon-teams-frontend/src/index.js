const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`



document.addEventListener("DOMContentLoaded", () => {
    fetchTrainers();
})


function fetchTrainers() {
    fetch("http://localhost:3000/trainers")
        .then(data => data.json())
        .then(allTrainers);
}

function allTrainers(obj) {

    for (let i = 0; i < obj.length; i++) {
        postTrainer(obj[i])
    }
}

function postTrainer(trainer) {
    const main = document.querySelector("main")
    const trainerDiv = document.createElement('div');
    trainerDiv.classList.add("card");
    trainerDiv.setAttribute('data-id', trainer.id)
    const p = document.createElement('p');
    p.innerText = trainer.name
    trainerDiv.append(p);


    const addButton = document.createElement("button");
    addButton.setAttribute('data-trainer-id', trainer.id)
    addButton.innerText = "Add Pokemon"
    addButton.addEventListener("click", function () {
        addPokemon(trainer.id)
    })
    trainerDiv.append(addButton);

    const ul = document.createElement("ul");

    for (let i = 0; i < trainer.pokemons.length; i++) {
        const pokemonList = document.createElement('li');

        const releaseButton = document.createElement('button');
        releaseButton.classList.add("release");
        releaseButton.setAttribute("data-pokemon-id", trainer.pokemons[i].id);
        releaseButton.innerText = "Release";
        releaseButton.addEventListener('click', function () {
            APIDeletePokemon(trainer.pokemons[i].id)
        });
        let nickname = trainer.pokemons[i].nickname;
        let species = trainer.pokemons[i].species;
        pokemonList.innerText = `${nickname} (${species})`;
        pokemonList.append(releaseButton);
        ul.append(pokemonList)
    }

    trainerDiv.append(ul)

    main.append(trainerDiv)


    trainerDiv.data_id = trainer.id;

}

function addPokemon(trainerID) {

    fetch("http://localhost:3000/pokemons", {
        method: "POST",
        headers: {
            "Content_Type": "application/json"
        },
        body: JSON.stringify({ "trainerId": trainerID })
    });


}

function APIDeletePokemon(id) {
    fetch(`http://localhost:3000/pokemons/${id}`, {
        method: "DELETE"
    });
}
