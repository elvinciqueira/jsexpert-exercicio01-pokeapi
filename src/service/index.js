const Team = require('./teamService');

function getAvailableServices() {
  return {
    team: Team,
  };
}

module.exports = {
  getAvailableServices,
};
