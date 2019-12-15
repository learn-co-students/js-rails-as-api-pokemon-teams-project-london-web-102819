class PokemonsController < ApplicationController
    def index
        pokemon = Pokemon.all 
        render json: PokemonSerializer.new(pokemon).to_serialized_json
    end

    def show
        pokemon = Pokemon.find(params[:id])
        render json: PokemonSerializer.new(pokemon).to_serialized_json
    end

    def create
        name = Faker::Name.first_name
        species = Faker::Games::Pokemon.name
        trainer_id = params[:trainer_id]
        pokemon = Pokemon.new(nickname: name, species: species, trainer_id: trainer_id)
        if pokemon.trainer.pokemon.size <6
            pokemon.save
            render json: PokemonSerializer.new(pokemon).to_serialized_json
        else
            raise "error"
        end
    end


    def destroy
        pokemon = Pokemon.find(params[:id])
        pokemon.destroy
        render json: PokemonSerializer.new(pokemon).to_serialized_json
    end
end
