Meteor.loginVisitor();

Template.create.events({
  'click #newIdea': function() {
    var newIdea = $('.create');
    if(!newIdea.hasClass("active")){
      newIdea.addClass("active");
    }
  },
  'click #addIdea': function() {
    var ideaName = $('#newIdea').val();
    $('#newIdea').val('');
    $('.create').removeClass('active');
    var idea = {
      name: ideaName,
      user: Meteor.userId()
    };
    ideaStream.emit('create', idea);
  }
});
