import Realm from 'realm';

class User extends Realm.Object {}
User.schema = {
  name: 'User',
  properties: {
    firstName: 'string',
    lastName: 'string',
    password: 'string'
  }
};


export default new Realm(
{
    schema: [User],
    schemaVersion: 3,
    migration: function(oldRealm, newRealm) {


    },
});
