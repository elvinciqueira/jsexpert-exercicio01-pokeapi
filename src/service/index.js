const Team = require('./team');

function getAvailableServices() {
  return {
    team: Team,
  };
}

module.exports = {
  getAvailableServices,
};
