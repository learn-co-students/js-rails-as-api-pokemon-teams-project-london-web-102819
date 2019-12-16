Rails.application.routes.draw do
  # resources :pokemons, only: :show
  # resources :trainers

  
  get '/trainers', to: 'trainers#trainers'
  get '/pokemons', to: 'pokemons#pokemons'
  delete '/pokemons/:id', to: 'pokemons#destroy'
  post '/pokemons', to: 'pokemons#create'

  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
