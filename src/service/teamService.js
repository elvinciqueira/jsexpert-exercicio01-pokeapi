const {
  getPokemonByUrl,
  getPokemons,
} = require('../repository/teamRepository');

async function getTeam(
  teamSize = 3,
  getRandomPokemonsModule = getRandomPokemons
) {
  const pokemons = await getPokemons();
  const randomPokemons = getRandomPokemonsModule(pokemons, teamSize);

  return extractPokemonData(randomPokemons);
}

function getRandomPokemons(
  list,
  quantity,
  getRandomItemFromArrayModule = getRandomItemFromArray
) {
  return [...Array(quantity)].map(() => getRandomItemFromArrayModule(list));
}

function getRandomItemFromArray(list) {
  return list[Math.floor(Math.random() * list.length)];
}

function extractPokemonData(pokemonRaw) {
  return Promise.all(
    pokemonRaw.map(async (pokemon) => {
      const pokemonData = await getPokemonByUrl(pokemon.url);

      return {
        name: pokemonData.name,
        moves: pokemonData.moves.slice(0, 3).map((move) => move.move.name),
      };
    })
  );
}

module.exports = {
  getTeam,
  getRandomItemFromArray,
  getRandomPokemons,
};
