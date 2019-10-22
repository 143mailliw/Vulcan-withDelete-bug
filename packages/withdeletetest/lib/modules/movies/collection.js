/*

modules/movies/collection.js - #tutorial-step-9 -
This is the main Movies collection definition file.

A collection in VulcanJS is basically is a model, a type of data, like posts, comments, or users.  

*/

import { createCollection, getDefaultResolvers, getDefaultMutations } from 'meteor/vulcan:core';
import Users from 'meteor/vulcan:users';
import schema from './schema.js';

/*

Movies collection definition

We create a new collection with the createCollection function
*/
const Movies = createCollection({

  // It takes the collection name...
  collectionName: 'Movies',

  // ...the type name, which is it's name of that type's singular instance
  // usually it is the same as the collection name but singular.
  // It comes in useful when it is time to build our GraphQL schema...
  typeName: 'Movie',

  // ...this is a JS schema, not GraphQL...
  schema,
  
  // ...then our default resolvers and default mutations...

  // A resolver is the thing that gives you data, that fetches it in the database and sends it to the client.
  // There are two default resolvers: multi - for a list of documents, and single - for a single document.
  // You can code your own too. Check out the next example, the movies example to do so...
  resolvers: getDefaultResolvers('Movies'),

  // A mutation is the act of changing data on the server.
  // There are three default mutaitons: creating a new document, updating an existing document, and deleting a document. You can only do this if you own it.
  mutations: getDefaultMutations('Movies'),

});

/*

Permissions for members (regular users)

...members are default users in Vulcan...

*/
const membersActions = [
  // ...these are the actions that members can do...
  'movies.new',
  'movies.edit.own',
  'movies.remove.own',
];
Users.groups.members.can(membersActions);

/*

Default sort

This is the default sort view for this data type...

*/
Movies.addDefaultView(terms => ({
  options: {
    sort: {
      // ...We want to order by when it was created.
      // This gets passed to MongoDB.
      // This will insert in the same order on the server and the client,
      // which is how the app knew where to put our new Jaws 14 entry in the page.
      createdAt: -1
    }
  }
}));

Movies.addView('byNameView', terms => ({
  selector: {
    name: terms.name
  },
  options: {
    sort: {
      //put the newest at the bottom
      createdAt: 1 
    }
  }
}));

export default Movies;

// There were three things I mentioned that you might not have heard of:
// schema, resolvers, and mutations. I will talk about them in the next steps.
