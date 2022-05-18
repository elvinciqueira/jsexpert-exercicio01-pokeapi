const { getPokemon, getPokemons } = require('../repository/team');

async function getTeam(teamSize = 3) {
  const pokemons = await getRandomPokemons(teamSize);
  return pokemons;
}

async function getRandomPokemons(quantity) {
  const pokemons = await getPokemons();
  const pokemonRaw = getMultipleRandomItemsFromArray(pokemons, quantity);

  return Promise.all(extractPokemonData(pokemonRaw));
}

function getMultipleRandomItemsFromArray(list, quantity) {
  return [...Array(quantity)].map(() => getRandomItemFromArray(list));
}

function getRandomItemFromArray(list) {
  return list[Math.floor(Math.random() * list.length)];
}

function extractPokemonData(pokemonRaw) {
  return pokemonRaw.map(async (pokemon) => {
    const pokemonData = await getPokemon(pokemon.url);

    return {
      name: pokemonData.name,
      moves: pokemonData.moves.slice(0, 3).map((move) => move.move.name),
    };
  });
}

module.exports = {
  getTeam,
};
