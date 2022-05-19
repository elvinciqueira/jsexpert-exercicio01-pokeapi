const { createServer } = require('../../src/api');
const request = require('supertest');

describe('API Suit Tests', () => {
  describe('when /team:get is called', () => {
    let api;
    beforeAll(() => {
      api = createServer();
    });

    afterAll(() => {
      api.close();
    });

    it('return status 200', async () => {
      const response = await request(api).get('/team');
      expect(response.status).toBe(200);
    });

    it('return 3 pokemons in the team', async () => {
      const response = await request(api).get('/team');
      expect(response.body.team.length).toBe(3);
    });

    it('return a name and 3 moves for each pokemon in the team', async () => {
      const response = await request(api).get('/team');
      const team = response.body.team;

      team.forEach((pokemon) => {
        expect(pokemon.name).toBeDefined();
        expect(pokemon.moves.length).toBe(3);
      });
    });
  });

  describe('when default route is called', () => {
    it('redirect', async () => {
      const response = await request(createServer()).get('/').expect(200);
      expect(response.body.success).toBe(true);
    });
  });
});
