const {
  getTeam,
  getRandomItemFromArray,
  getRandomPokemons,
} = require('./team');
const {
  teamRepositoryMock,
  mocks,
} = require('../../test/mocks/teamRepository.mock');

describe('getItem', () => {
  const teamRepository = teamRepositoryMock;

  it('return a pokemon team with 3 random pokemons', async () => {
    const pokemons = await teamRepository.getPokemons();
    const pokemonsRaw = [pokemons[0], pokemons[1], pokemons[2]];
    const getRandomPokemonsStub = jest.fn(() => pokemonsRaw);

    const team = await getTeam(3, getRandomPokemonsStub);
    const expectedTeam = mocks.team;

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
  const teamRepository = teamRepositoryMock;

  it('return a random list of pokemons', async () => {
    const pokemons = await teamRepository.getPokemons();
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
