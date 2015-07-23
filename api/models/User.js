/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

    attributes: {

        twitterId: "STRING",

        votes: {
            collection: "vote",
        },
        tweets: {
            collection: "tweet",
        }
    },

    createIfFromTweet: function(tweet, next) {
        var data               = tweet.data;
        var twitterId          = data.voter.twitter_id;
        var candidateTwitterId = data.candidates[0].twitter_id;

        User.findOrCreate({
            twitterId: twitterId,
        })
        .populate("votes")
        .populate("tweets")
        .then(function(user) {

            // IMPORTANT!!!
            // TODO - move metaData mutations to vote method..
            //      - it makes sense to do all metaData mutations in the same spot...

            var userVotes = user.votes;
            var metaData = {
                userInitialVotesCount: userVotes.length,
                userUpdatingVote: userVotes.some(function(v) { return v.candidateTwitterId === candidateTwitterId.toString(); }),
            };

            user.tweets.add(tweet);
            user.save(function(err, user) {
                next(err, user, tweet, metaData);
            });

        })
        .catch(function(err) {
            console.error("Error creating user record: ", err);
            return next(err);
        });

    },
};

