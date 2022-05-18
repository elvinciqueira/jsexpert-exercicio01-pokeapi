const http = require('http');
const { getAvailableServices } = require('./service');

const DEFAULT_PORT = 3000;
const DEFAULT_HEADERS = {
  'Content-Type': 'application/json',
};

function createServer(port = DEFAULT_PORT) {
  return http
    .createServer(handler)
    .listen(port, () => console.log(`Listening on port ${port}`));
}

function handler(request, response) {
  const { url, method } = request;
  const routeKey = `${url}:${method.toLowerCase()}`;

  const route = createRoute(routeKey);

  response.writeHead(200, DEFAULT_HEADERS);

  return route(request, response);
}

function createRoute(routeKey) {
  const constrollerBy = {
    default: (request, response) => {
      response.writeHeader(200, { 'Content-Type': 'text/html' });
      response.write(
        "Hey there, try /team so we can present to you your's 3 possibles choices"
      );

      return response.end();
    },
    '/team:get': async (request, response) => {
      const teamService = createService('team');
      const team = await teamService.getTeam();

      response.write(JSON.stringify({ team }));

      return response.end();
    },
  };

  return constrollerBy[routeKey] || constrollerBy.default;
}

function createService(serviceName) {
  const service = getAvailableServices()[serviceName];
  if (!service) {
    throw new Error(`Service "${serviceName}" not found`);
  }
  return service;
}

module.exports = {
  createServer,
};
