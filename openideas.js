// Set up a collection to contain idea information. On the server,
// it is backed by a MongoDB collection named "Ideas".
Ideas = new Mongo.Collection("ideas");

// Add a new stream for sending votes between client and server
ideaStream = new Meteor.Stream('votes');
