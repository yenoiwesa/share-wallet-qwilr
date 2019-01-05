const balance = require('./balance');

module.exports.install = router => {
    balance.installRoutes(router);
};
