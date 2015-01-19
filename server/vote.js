Meteor.startup(function () {
  voteStream.on('vote', function(vote) {
    // Find idea based on idea id from vote
    idea = Ideas.findOne(vote.idea);

    // If an idea exists with that id
    if (idea) {
      // Initialize the score and flag to update
      var incrementScore = vote.score;
      var update = false;

      // Initialize if idea does not have any votes yet
      if (!idea.votes) {
        idea.votes = {};
      }

      // If a vote exists for user and its not the same score as the last vote
      if (idea.votes[vote.user] && vote.score !== idea.votes[vote.user].score) {
        // Flag for update
        update = true;
        // If it was a downvote and is now an upvote, increment by 2
        if (vote.score === 1 && idea.votes[vote.user].score === -1) {
          incrementScore = 2;
        // Otherwise if it was an upvote and is now a downvote, decrement by 2
        } else if (vote.score === -1 && idea.votes[vote.user].score === 1) {
          incrementScore = -2
        }
      // Otherwsie if it is the first vote for the user
      } else if (!idea.votes[vote.user]) {
        // Flag for update
        update = true;
      }

      // If score should be updated
      if (update) {
        // Initialize with past votes
        var set = {
          votes: idea.votes
        };

        // Add new vote for user
        set.votes[vote.user] = {
          score: vote.score,
          user: vote.user
        };

        // Update and increment score in DB
        Ideas.update(vote.idea, {
          $inc: {
            score: incrementScore
          },
          $set: set
        });
      }
    }
  });
});
