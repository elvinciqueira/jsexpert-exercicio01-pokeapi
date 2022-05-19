const sinon = require('sinon');
const { default: axios } = require('axios');
const teamRepository = require('../../src/repository/teamRepository');

const urls = {
  base: 'https://pokeapi.co/api/v2/pokemon',
  charmander: 'https://pokeapi.co/api/v2/pokemon/4/',
  ivysaur: 'https://pokeapi.co/api/v2/pokemon/2/',
  bulbasaur: 'https://pokeapi.co/api/v2/pokemon/1/',
};

const mocks = {
  pokemons: require('../../test/mocks/valid-list-pokemons.json'),
  team: require('../../test/mocks/valid-team.json'),
  charmander: require('../../test/mocks/charmander-page.json'),
  bulbasaur: require('../../test/mocks/bulbasaur-page.json'),
  ivysaur: require('../../test/mocks/ivysaur-page.json'),
};

const fetchStub = sinon.stub(axios, 'get');

fetchStub.withArgs(urls.base).resolves({ data: mocks.pokemons });
fetchStub.withArgs(urls.charmander).resolves({ data: mocks.charmander });
fetchStub.withArgs(urls.ivysaur).resolves({ data: mocks.ivysaur });
fetchStub.withArgs(urls.bulbasaur).resolves({ data: mocks.bulbasaur });

module.exports = {
  urls,
  mocks,
  teamRepositoryMock: teamRepository,
};
