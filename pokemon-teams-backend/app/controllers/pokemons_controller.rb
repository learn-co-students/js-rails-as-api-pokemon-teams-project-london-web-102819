class PokemonsController < ApplicationController

    def pokemons
        pokemons = Pokemon.all
        render json: pokemons
    end

    def destroy 
        pokemon = Pokemon.find_by(id: params[:id])
        pokemon.destroy
    end

    def create
        trainer = Trainer.find_by(id: pokemon_params)

        pokemon = generate_pokemon
        pokemon.trainer = trainer
        pokemon.save
        render json: pokemon, except: [:created_at, :updated_at]

    end

    def generate_pokemon
        pokemon = Pokemon.new
        pokemon.nickname = Faker::Name.first_name
        pokemon.species = Faker::Games::Pokemon.name
        pokemon
    end



    private

    def pokemon_params
        params.require(:trainer_id)
    end

end
