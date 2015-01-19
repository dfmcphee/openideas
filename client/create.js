Meteor.loginVisitor();

Template.create.events({
  'click #newIdea': function() {
    var newIdea = $('.create');
    if(!newIdea.hasClass("active")){
      newIdea.addClass("active");
    }
  },
  'click #addIdea': function() {
    var idea = $('#newIdea').val();

    if (idea && idea.length > 0) {
      Ideas.insert({
        name: idea,
        voted: [],
        score: 0,
        user: Meteor.userId()
      });

      $('#newIdea').val('');
      $('.create').removeClass('active');
    }
  }
});
