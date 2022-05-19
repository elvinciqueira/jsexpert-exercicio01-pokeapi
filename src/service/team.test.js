const sinon = require('sinon');
const { default: axios } = require('axios');
const {
  getTeam,
  getRandomItemFromArray,
  getRandomPokemons,
} = require('./team');

const pokemonsMock = require('../../test/mocks/valid-list-pokemons.json');

const mock = {
  validTeam: require('../../test/mocks/valid-team.json'),
  charmander: require('../../test/mocks/charmander-page.json'),
  bulbasaur: require('../../test/mocks/bulbasaur-page.json'),
  ivysaur: require('../../test/mocks/ivysaur-page.json'),
};

const apiRoot = 'https://pokeapi.co/api/v2/pokemon';

const fetchStub = sinon.stub(axios, 'get');

fetchStub.withArgs(apiRoot).resolves({ data: pokemonsMock });
pokemonsMock.results.forEach((pokemon) => {
  fetchStub.withArgs(pokemon.url).resolves({ data: mock[pokemon.name] });
});

describe('getItem', () => {
  it('return a pokemon team with 3 random pokemons', async () => {
    const pokemons = pokemonsMock.results;
    const pokemonsRaw = [pokemons[0], pokemons[1], pokemons[2]];
    const getRandomPokemonsStub = jest.fn(() => pokemonsRaw);

    const team = await getTeam(3, getRandomPokemonsStub);
    const expectedTeam = [
      {
        name: 'charmander',
        moves: ['mega-punch', 'fire-punch', 'thunder-punch'],
      },
      { name: 'ivysaur', moves: ['swords-dance', 'cut', 'bind'] },
      {
        name: 'charmander',
        moves: ['mega-punch', 'fire-punch', 'thunder-punch'],
      },
    ];

    expect(team).toEqual(expectedTeam);
  });
});

describe('getRandomItemFromArray', () => {
  it('return a random item from an array', () => {
    const array = [1, 2, 3, 4];
    const randomItem = getRandomItemFromArray(array);

    expect(array).toContain(randomItem);
  });
});

describe('getRandomPokemons', () => {
  it('return a random list of pokemons', () => {
    const pokemons = pokemonsMock.results;
    const quantity = 3;
    const getRandomPokemonsSpy = jest.fn(() =>
      getRandomItemFromArray(pokemons)
    );

    const randomPokemons = getRandomPokemons(
      pokemons,
      quantity,
      getRandomPokemonsSpy
    );

    randomPokemons.forEach((pokemon) => {
      expect(pokemons).toContain(pokemon);
    });

    expect(getRandomPokemonsSpy).toHaveBeenCalledTimes(quantity);
  });
});
