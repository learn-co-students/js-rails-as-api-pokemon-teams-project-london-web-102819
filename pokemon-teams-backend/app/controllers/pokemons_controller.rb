class PokemonsController < ApplicationController
  def new
  end

  def create
    name = Faker::Name.first_name
    species = Faker::Games::Pokemon.name
    @pokemon = Pokemon.new(nickname: name, species: species, trainer_id: params[:trainerId])
    puts @pokemon.trainer.name
    if @pokemon.trainer.valid?
      @pokemon.save
    end
  end

  def show
    @pokemon = Pokemon.find_by(id: params[:id])
  end

  def destroy
    @pokemon = Pokemon.find_by(id: params[:id])
    @pokemon.destroy
  end
end
