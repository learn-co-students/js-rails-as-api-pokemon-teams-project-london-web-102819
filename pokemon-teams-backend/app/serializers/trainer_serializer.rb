class TrainerSerializer
  include FastJsonapi::ObjectSerializer
  # attributes :name
  has_many :pokemons


  # def data
  #   {
  #     name: object.name,
  #     pokemons: parse_pokemon(object.pokemons)
  #   }

  # end
  # def parse_pokemon(pokemons)
  #   pokemons.map do |pokemon|
  #     {
  #       nickname: pokemon.nickname


  #     }
  #   end
  # end

end
