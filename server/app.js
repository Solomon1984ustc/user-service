// Super complex user service logic...
Meteor.startup(function() {
  Cluster.connect(Meteor.settings.cluster_discovery_url);
  Cluster.register("auth");
});