Template.leaderboard.helpers({
  ideas: function () {
    return Ideas.find({}, { sort: { score: -1, name: 1 } });
  },
  selectedIdea: function () {
    var idea = Ideas.findOne(Session.get("selectedIdea"));

    if (idea && idea.votes && idea.votes[Meteor.userId()]) {
      if (idea.votes[Meteor.userId()].score === 1) {
        Session.set('voted', 'up');
      }
      else if (idea.votes[Meteor.userId()].score === -1) {
        Session.set('voted', 'down');
      }
    } else {
      Session.set('voted', '');
    }

    return idea && idea.name;
  },
  voted: function () {
    return Session.get('voted');
  }
});

Template.leaderboard.events({
  'click .inc': function () {
    Session.set('voted', 'up');
    var vote = {
      idea: Session.get("selectedIdea"),
      user: Meteor.userId(),
      score: 1
    };
    ideaStream.emit('vote', vote);
  },
  'click .dec': function () {
    Session.set('voted', 'down');
    var vote = {
      idea: Session.get("selectedIdea"),
      user: Meteor.userId(),
      score: -1
    };
    ideaStream.emit('vote', vote);
  }
});
