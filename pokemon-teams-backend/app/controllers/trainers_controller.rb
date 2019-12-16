class TrainersController < ApplicationController

    def trainers
        trainers = Trainer.all
        render json: trainers , include: [pokemons: {except: [:created_at, :updated_at]}], except: [:created_at, :updated_at]
    end

end
