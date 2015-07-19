/**
* Vote.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

    attributes: {
        emoji: "STRING",
        voter: "STRING",
        candidate: "STRING",
    },

    createFromTweet: function(tweet, next) {
        var data = tweet.data;
        Vote.create().exec(function(err, vote) {
            if (err) return next(err);
            vote.emoji = data.vote;
            vote.voter = data.voter;
            vote.candidate = data.candidates && data.candidates[0];
            vote.save(next);
        });
    }
};

