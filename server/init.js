Meteor.startup(function () {
  // If no ideas exist, insert a few as examples with random scores
  if (Ideas.find().count() === 0) {
    var names = [
      "Instagram for dogs.",
      "Social feed aggregator.",
      "Submit random ideas for developers."
    ];
    _.each(names, function (name) {
      Ideas.insert({
        name: name,
        voted: [],
        score: Math.floor(Random.fraction() * 10) * 5
      });
    });
  }
});
