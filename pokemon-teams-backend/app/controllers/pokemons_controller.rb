class PokemonsController < ApplicationController
  def create
    trainer = Trainer.find(params[:trainer_id].to_i)

    if trainer.pokemons.count < 6
      name = Faker::Name.first_name
      species = Faker::Games::Pokemon.name
      pokemon = Pokemon.create(nickname: name, species: species, trainer_id: trainer.id)
      render json: pokemon
    end
  end

  def destroy
    Pokemon.find(params[:id]).destroy
  end
end
