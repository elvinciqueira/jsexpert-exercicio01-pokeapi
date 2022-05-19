const {
  teamRepositoryMock,
  mocks,
  urls,
} = require('../../test/mocks/teamRepository.mock');

describe('getPokemons', () => {
  it('return a list of pokemons', async () => {
    const pokemons = await teamRepositoryMock.getPokemons();
    const expectedPokemonsList = mocks.pokemons.results;

    expect(pokemons).toEqual(expectedPokemonsList);
  });
});

describe('getPokemonByUrl', () => {
  it('return a pokemon', async () => {
    const pokemon = await teamRepositoryMock.getPokemonByUrl(urls.charmander);
    const expectedPokemon = mocks.charmander;

    expect(pokemon).toEqual(expectedPokemon);
  });
});
