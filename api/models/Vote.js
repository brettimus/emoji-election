/**
* Vote.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

    attributes: {
        emoji              : "STRING",
        voter              : "STRING",
        voterTwitterId     : "STRING",
        candidate          : "STRING",
        candidateTwitterId : "STRING",
        tweetTwitterId     : "STRING",
    },

    createIfFromTweet: function(tweet, next) {
        var data = tweet.data;
        var voterTwitterId = data.voter.twitter_id;

        Vote.findOne({
            voterTwitterId: data.voter.twitter_id,
            candidateTwitterId: data.candidates[0].twitter_id,
        })
        .exec(_createIfHelper(data, next));

    },

    updateFromTweetData: function(vote, data, next) {
        vote.emoji = data.vote;

        vote.voter          = data.voter.handle;
        vote.voterTwitterId = data.voter.twitter_id;

        vote.candidate          = data.candidates[0].handle;
        vote.candidateTwitterId = data.candidates[0].twitter_id;

        vote.tweetTwitterId = data.tweet_id;

        vote.save(next);
    }
};

function _createIfHelper(data, next) {
    // Scopes our db query callback to the tweet data and req callback (next)
    return function(err, vote) {
           if (err) return next(err);

           var isNew;

           if (vote) {
               isNew = false;
               Vote.updateFromTweetData(vote, data, function(err) {
                   next(err, vote, isNew);
               });
           }
           else {
               isNew = true;
               Vote.create().exec(function(err, vote) {
                   if (err) return next(err);
                   Vote.updateFromTweetData(vote, data, function(err) {
                       next(err, vote, isNew);
                   });
               });
           }
    };
}
