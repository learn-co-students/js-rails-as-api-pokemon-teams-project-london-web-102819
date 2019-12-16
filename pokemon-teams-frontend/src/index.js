const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
const trainerContainer = document.querySelector('main');


const trainers = fetch(TRAINERS_URL)
                    .then(data => data.json())
                    .then(createTrainers)


function createTrainers(trainers) {
    trainers.forEach(t => createTrainer(t));
}

function createTrainer(trainerData) {

    const card = document.createElement('div');
    card.className = "card";
    card.dataset.id = trainerData.id;

    const p = document.createElement('p');
    p.innerText = trainerData.name
    card.appendChild(p);

    const addButton = document.createElement('button');
    addButton.dataset.trainerId = trainerData.id;
    addButton.innerText = "Add Pokemon";
    addButton.addEventListener('click', addPokemon);
    card.appendChild(addButton);

    const pokemonList = document.createElement('ul');
    card.appendChild(pokemonList);

    trainerContainer.appendChild(card);

    trainerData.pokemons.forEach(createPokemon);
}

function createPokemon(pokemonData) {
    
    
    const pokemonList = document.querySelector(`div[data-id ="${pokemonData.trainer_id}"]`).querySelector('ul');
    const pokemon = document.createElement('li');
    
    
    pokemon.innerText = `${pokemonData.nickname} (${pokemonData.species})`;

    const releaseButton = document.createElement('button');
    releaseButton.className = "release";
    
    releaseButton.dataset.pokemonId = pokemonData.id;
    releaseButton.innerText = "Release";
    releaseButton.addEventListener('click', releasePokemon);
    pokemon.appendChild(releaseButton);
    
    pokemonList.appendChild(pokemon);
}

function releasePokemon(e) {
    console.log(e.target);
    fetch(`${POKEMONS_URL}/${e.target.dataset.pokemonId}`, {method: "DELETE"});
    e.target.parentNode.remove();
}

function addPokemon(e) {
    
    const trainerId = e.target.dataset.trainerId;

    let configObj = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
            trainer_id: `${trainerId}`
        })
      };

    fetch(POKEMONS_URL, configObj).then(resp => resp.json()).then(createPokemon).catch(console.log);
}


//<div class="card" data-id="1"><p>Prince</p>
//  <button data-trainer-id="1">Add Pokemon</button>
//  <ul>
//    <li>Jacey (Kakuna) <button class="release" data-pokemon-id="140">Release</button></li>
//    <li>Zachariah (Ditto) <button class="release" data-pokemon-id="141">Release</button></li>
//    <li>Mittie (Farfetch'd) <button class="release" data-pokemon-id="149">Release</button></li>
//    <li>Rosetta (Eevee) <button class="release" data-pokemon-id="150">Release</button></li>
//    <li>Rod (Beedrill) <button class="release" data-pokemon-id="151">Release</button></li>
//  </ul>
//</div>