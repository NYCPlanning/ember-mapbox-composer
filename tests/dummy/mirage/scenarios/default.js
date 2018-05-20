export default function(server) {
  server.loadFixtures('sources');
  server.loadFixtures('layer-groups');
  /*
    Seed your development database using your factories.
    This data will not be loaded in your tests.
  */

  // server.createList('post', 10);
}
