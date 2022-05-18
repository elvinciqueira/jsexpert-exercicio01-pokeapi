const { getPokemon, listPokemons } = require('../repository/team');

async function getTeam(teamSize = 3) {
  return listPokemons()
    .then(getRandomPokemons(teamSize))
    .then(extractPokemonData);
}

const getRandomPokemons = (quantity) => (pokemons) => {
  return [...Array(quantity)].map(() => getRandomItemFromArray(pokemons));
};

function getRandomItemFromArray(list) {
  return list[Math.floor(Math.random() * list.length)];
}

function extractPokemonData(pokemonRaw) {
  return Promise.all(
    pokemonRaw.map(async (pokemon) => {
      const pokemonData = await getPokemon(pokemon.url);

      return {
        name: pokemonData.name,
        moves: pokemonData.moves.slice(0, 3).map((move) => move.move.name),
      };
    })
  );
}

module.exports = {
  getTeam,
};
