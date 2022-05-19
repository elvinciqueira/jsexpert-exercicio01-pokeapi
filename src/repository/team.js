const { default: axios } = require('axios');

const API_URL = 'https://pokeapi.co/api/v2/pokemon';

async function getPokemons() {
  const response = await axios.get(API_URL);
  return response.data.results;
}

async function getPokemonByUrl(url) {
  const response = await axios.get(url);
  return response.data;
}

module.exports = {
  getPokemons,
  getPokemonByUrl,
};
