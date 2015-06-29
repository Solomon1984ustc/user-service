Package.describe({
  name: 'accounts-base',
  summary: "A user account system",
  version: "1.2.0"
});

Package.onUse(function (api) {
  api.use('underscore', 'server');
  api.use('check', 'server');
  api.use('random', 'server');
  api.use('ejson', 'server');
  api.use('callback-hook', 'server');

  // use unordered to work around a circular dependency
  // (service-configuration needs Accounts.connection)
  api.use('service-configuration', 'server', { unordered: true });

  // needed for getting the currently logged-in user
  api.use('ddp', 'server');

  // need this because of the Meteor.users collection but in the future
  // we'd probably want to abstract this away
  api.use('mongo', 'server');

  // Allow us to detect 'autopublish', and publish some Meteor.users fields if
  // it's loaded.
  api.use('autopublish', 'server', {weak: true});

  api.use('oauth-encryption', 'server', {weak: true});

  api.export('Accounts');
  api.export('AccountsServer', 'server');
  api.export('AccountsTest', {testOnly: true});

  api.addFiles('accounts_common.js', 'server');
  api.addFiles('accounts_server.js', 'server');
  api.addFiles('url_server.js', 'server');

  // These files instantiate the default Accounts instance on the server
  // and the client, so they must be evaluated last to ensure that the
  // prototypes have been fully populated.
  api.addFiles('globals_server.js', 'server');
});

Package.onTest(function (api) {
  api.use('accounts-base');
  api.use('tinytest');
  api.use('random');
  api.use('test-helpers');
  api.use('oauth-encryption');
  api.addFiles('accounts_tests.js', 'server');
});
