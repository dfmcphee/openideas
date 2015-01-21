Template.idea.helpers({
  selected: function () {
    return Session.equals("selectedIdea", this._id) ? "selected" : '';
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
  owned: function() {
    return (Meteor.userId() === this.user);
  },
  voted: function () {
    return Session.get('voted');
  }
});

Template.idea.events({
  'click': function () {
    $('.create, .inc, .dec').removeClass('active');
    Session.set("selectedIdea", this._id);
  },
  'click .remove': function () {
    if (confirm('Are you sure you want to delete this idea?')) {
      ideaStream.emit('remove', this._id);
    }
  },
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
