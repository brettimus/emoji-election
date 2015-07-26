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
        candidateName      : "STRING",
        candidateTwitterId : "STRING",
        tweetTwitterId     : "STRING",

        tweet: {
            model: 'tweet',
        },
        user: {
            model: 'user',
        },
    },

    createIfFromUserAndTweet: function(user, tweet, metaData, next) {
        var data = tweet.data;

        Vote.findOrCreate({
            user            : user.id,
            candidateTwitterId: data.candidates[0].twitter_id,
        })
        .then(onVoteCreate)
        .catch(function(err) {
            console.error("Error creating Vote record: ", err);
        });

        function onVoteCreate(vote) {

            associateUser(onUserSave);

            function associateUser(callback) {
                if (user.votes.some(function(v) { return v.id === vote.id; })) {
                    process.nextTick(function() {
                        callback(null);
                    });
                }
                else {
                    user.votes.add(vote.id);
                    user.save(callback);
                }
            }

            function onUserSave(err) {
                if (err) {
                    console.error("Error creating vote associations", err);
                    return next(err);
                }
                mergeVoteWithData(vote, data);
                vote.tweet = tweet.id;
                vote.save(onVoteSave);
            }

            function onVoteSave(err, vote) {
                if (err) return next(err);
                //
                // add metadata
                //
                async.parallel([
                    similarVoteCount(vote),
                    candidateVoteCount(vote),
                ], function(err, _results) {
                    return next(err, vote, metaData);
                });
            }

            function similarVoteCount(vote) {
                return function(callback) {
                    Vote.count({
                        emoji             : vote.emoji,
                        candidateTwitterId: vote.candidateTwitterId,
                    })
                    .then(function(count) {
                        metaData.similarVoteCount = count;
                        callback(null);
                    })
                    .catch(callback);
                };
            }

            function candidateVoteCount(vote) {
                return function(callback) {
                    Vote.count({
                        candidateTwitterId: vote.candidateTwitterId,
                    })
                    .then(function(count) {
                        metaData.candidateVoteCount = count;
                        callback(null);
                    })
                    .catch(callback);
                };
            }

        }
    },

    // createIfFromTweet: function(tweet, next) {
    //     var data = tweet.data;
    //     var voterTwitterId = data.voter.twitter_id;

    //     Vote.findOne({
    //         voterTwitterId: data.voter.twitter_id,
    //         candidateTwitterId: data.candidates[0].twitter_id,
    //     })
    //     .exec(createOrUpdate(data, next));

    // },

    // updateFromTweetData: function(vote, data, next) {

    //     Vote.findOne({
    //         emoji: data.vote,
    //         candidateTwitterId: data.candidates[0].twitter_id,
    //     })
    //     .exec(function(err, similarVote) {
    //         if (err) return next(err);

    //         var isFirstVote = !similarVote;
        
    //         mergeVoteWithData(vote, data);

    //         vote.save(function(err, vote) {
    //             next(err, vote, isFirstVote);
    //         });
    //     });
    // }
};

// function createOrUpdate(data, next) {
//     // Scopes our db query callback to the tweet data and req callback (next)
//     return function(err, vote) {
//             if (err) return next(err);

//             if (vote) {
//                 Vote.updateFromTweetData(vote, data, function(err, modVote, isFirstVote) {

//                     next(err, vote, {
//                         isNew: false,
//                         isFirstVote: isFirstVote,
//                     });

//                 });
//             }

//             else {
//                 Vote.create().exec(function(err, vote) {
//                     if (err) return next(err);

//                     Vote.updateFromTweetData(vote, data, function(err, modVote, isFirstVote) {

//                         next(err, vote, {
//                             isNew: true,
//                             isFirstVote: isFirstVote,
//                         });

//                     });
//                 });
//             }
//     };
// }

function mergeVoteWithData(vote, data) {
    vote.emoji = data.vote;

    vote.voter          = data.voter.handle;
    vote.voterTwitterId = data.voter.twitter_id;

    vote.candidate          = data.candidates[0].handle;
    vote.candidateName      = data.candidates[0].name;
    vote.candidateTwitterId = data.candidates[0].twitter_id;

    vote.tweetTwitterId = data.tweet_id;
}
