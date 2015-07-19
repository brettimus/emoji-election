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

    createFromTweet: function(tweet, next) {
        var data = tweet.data;
        var voterTwitterId = data.voter.twitter_id;
        Vote.findOneByVoterTwitterId(voterTwitterId).exec(function(err, vote) {
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
        });
    },

    updateFromTweetData: function(vote, data, next) {
        vote.emoji = data.vote;

        vote.voter = data.voter && data.voter.handle;
        vote.voterTwitterId = data.voter && data.voter.twitter_id;

        vote.candidate = data.candidates && data.candidates[0].handle;
        vote.candidateTwitterId = data.candidates && data.candidates[0].twitter_id;

        vote.tweetTwitterId = data.tweet_id;

        vote.save(next);
    }
};

