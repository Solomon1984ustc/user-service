Package.describe({
  name: "accounts-password",
  summary: "Password support for accounts",
  version: "1.1.1"
});

Package.onUse(function(api) {
  api.use('npm-bcrypt@=0.7.8_2');

  api.use('accounts-base', 'server');
  // Export Accounts (etc) to packages using this one.
  api.imply('accounts-base', 'server');
  api.use('srp', 'server');
  api.use('sha', 'server');
  api.use('email', 'server');
  api.use('random', 'server');
  api.use('check');
  api.use('underscore');
  api.use('ddp', 'server');

  api.addFiles('email_templates.js', 'server');
  api.addFiles('password_server.js', 'server');
});

Package.onTest(function(api) {
  api.use(['accounts-password', 'tinytest', 'test-helpers', 'tracker',
           'accounts-base', 'random', 'email', 'underscore', 'check',
           'ddp'], 'server');
  api.addFiles('password_tests_setup.js', 'server');
  api.addFiles('password_tests.js', 'server');
  api.addFiles('email_tests_setup.js', 'server');
});
