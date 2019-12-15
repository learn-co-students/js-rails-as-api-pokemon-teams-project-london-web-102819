const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`



fetch(TRAINERS_URL)
.then(response => response.json())
.then(trainers => trainers.forEach(displayATeam));


function displayATeam(trainer){
    const main = document.querySelector('main');

    let div = document.createElement('div');
    div.classList.add("card");
    div.setAttribute('data-id', trainer.id);
    main.appendChild(div);

    let p = document.createElement('p');
    p.innerText = trainer.name;
    div.appendChild(p);

    let addButton = document.createElement('button');
    addButton.setAttribute('data-trainer-id', trainer.id);
    addButton.innerText = "Add Pokemon";
    div.appendChild(addButton);

    addButton.addEventListener("click", addPokemon, false)

    let ul = document.createElement('ul');
    pokemon = trainer.pokemon
    for (let i = 0; i < pokemon.length; i++){
        createPokemon(pokemon[i], ul);
    }
    div.appendChild(ul);
};

function createPokemon(pokepoke,ul){
    let li = document.createElement('li');
    li.innerText = `${pokepoke.nickname} (${pokepoke.species})`
    ul.appendChild(li);
    
    let releaseButton = document.createElement("button");
    releaseButton.classList.add('release');
    releaseButton.setAttribute('data-pokemon-id', pokepoke.id);
    releaseButton.innerText = "Release";
    li.appendChild(releaseButton);

    releaseButton.addEventListener("click", releasePokemon, false);
}

function addPokemon(event){
    trainer_id = event.target.getAttribute("data-trainer-id");
    let ul = event.target.parentNode.querySelector('ul');
    const configObj={ 
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            trainer_id: trainer_id
        })
    }
    fetch (POKEMONS_URL, configObj)
    .then(function(response){
        if (response.ok){
            response.json()
            .then(obj => createPokemon(obj, ul))   
        }
    });
}

function releasePokemon (event){
    const release = event.target;
    fetch (`${POKEMONS_URL}/${release.getAttribute('data-pokemon-id')}`, {method: "DELETE"})
    .then(function(response){
        if (response.ok){
            release.parentNode.remove()
        }
    });
}