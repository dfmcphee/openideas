Template.leaderboard.helpers({
  ideas: function () {
    return Ideas.find({}, { sort: { score: -1, name: 1 } });
  }
});
