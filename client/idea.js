Template.idea.helpers({
  selected: function () {
    return Session.equals("selectedIdea", this._id) ? "selected" : '';
  },
  owned: function() {
    return (Meteor.userId() === this.user);
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
  }
});
