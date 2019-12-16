class PokemonsController < ApplicationController

    def create
        trainer = Trainer.find(pokemon_params)
        pokemon = generate_pokemon
        pokemon.trainer = trainer
        pokemon.save
        render json: pokemon, except: [:created_at, :updated_at]
    end 

    def delete 
        pokemon = Pokemon.findparams[:id])
        pokemon.destroy
        render json: pokemon, except: [:created_at, :updated_at]
    end 

    private

    def generate_pokemon
        pokemon = Pokemon.new
        pokemon.nickname = Faker::Name.first_name
        pokemon.species = Faker::Games::Pokemon.name
        pokemon

    end 

    def pokemon_params
        params.require(:trainer.id)
    end 

end
