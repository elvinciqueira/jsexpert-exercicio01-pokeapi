const { default: axios } = require('axios');

const API_URL = 'https://pokeapi.co/api/v2/pokemon';

async function listPokemons() {
  const response = await axios.get(API_URL);
  return response.data.results;
}

async function getPokemon(url) {
  const response = await axios.get(url);
  return response.data;
}

module.exports = {
  listPokemons,
  getPokemon,
};
