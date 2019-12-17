const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

const init = () => {
  getTrainers();
}

document.addEventListener('DOMContentLoaded', init);

const getTrainers = () => {
  return fetch(TRAINERS_URL)
    .then(res => res.json())
    .then(json => json.forEach((trainer) => createTrainerCard(trainer)))
};

const createTrainerCard = (trainer) => {
  const mainDiv = document.querySelector('main');
  const divCard = document.createElement('div');
  const p = document.createElement('p');
  const addBtn = document.createElement('button');
  const ulList = document.createElement('ul');

  divCard.classList.add('card');
  divCard.dataset.id = trainer.id;
  addBtn.dataset.id = trainer.id;

  addBtn.innerText = 'Add Pokemon'
  p.innerText = trainer.name;

  addBtn.addEventListener('click', () => addAPokemon(trainer, ulList));

  for (element of trainer.pokemons) {
    createAPokemon(element, ulList);
  }

  divCard.append(p, addBtn, ulList)
  mainDiv.append(divCard)

};

const createAPokemon = (element, ulList) => {
  const li = document.createElement('li');
  const releaseButton = document.createElement('button');

  releaseButton.className = 'release';
  releaseButton.dataset.pokemonId = element.id;

  li.textContent = `${element.nickname} (${element.species}) `;
  releaseButton.textContent = 'Release';

  releaseButton.addEventListener('click', () => releasePokemon(element, li));

  li.appendChild(releaseButton);
  ulList.appendChild(li);
}

const addAPokemon = (trainer, ulList) => {
  configObj = {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ trainer_id: trainer.id })
  };

  fetch(POKEMONS_URL, configObj)
    .then(res => res.json())
    .then(json => createAPokemon(json, ulList))
    .catch(error => console.log(error))
};

const releasePokemon = (pokemon, li) => {
  configObj = {
    method: "DELETE"
  };

  fetch(`${POKEMONS_URL}/${pokemon.id}`, configObj)
    .then(li.remove())
    .catch(error => console.log(error))

};