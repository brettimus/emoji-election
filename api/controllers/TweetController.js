/**
 * TweetController
 *
 * @description :: Server-side logic for managing tweets
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	create: function(req, res) {

        var data             = req.allParams(),
            original_request = data;

        Tweet.createFromBotData(data, function(err, tweet) {

            if (err) {
                sails.log("ERROR creating tweet from bot data", err);
                return somethingWentWrong(res);
            }

            User.createIfFromTweet(tweet, function(err, user, tweet, metaData) {
                if (err) {
                   sails.log("ERROR creating user from tweet model", err);
                   return somethingWentWrong(res);
                }

                Vote.createIfFromUserAndTweet(user, tweet, metaData, function(err, vote, metaData) {
                    if (err) {
                       sails.log("ERROR creating vote from user and tweet", err);
                       return somethingWentWrong(res);
                    }

                    Vote.publishCreate(vote);

                    res.send({
                        original_request     : original_request,
                        userInitialVotesCount: metaData.userInitialVotesCount,
                        candidateVoteCount   : metaData.candidateVoteCount,
                        userUpdatingVote     : metaData.userUpdatingVote,
                        similarVoteCount     : metaData.similarVoteCount,
                        isFirstVote          : (metaData.userInitialVotesCount === 0),
                        isNew                : !metaData.userUpdatingVote,
                    });
                });

            });



            // Vote.createIfFromTweet(tweet, function(err, vote, data) {
            //     if (err) {
            //        sails.log("ERROR creating vote from tweet model", err);
            //        return somethingWentWrong(res);
            //     }

            //     Vote.publishCreate(vote);

            //     res.send({
            //         original_request: original_request,
            //         isNew           : data.isNew,
            //         isFirstVote     : data.isFirstVote,

            //     });
            // });
        });

    },
};

function somethingWentWrong(res) {
    res.status(500);
    res.send("Something went wrong.");
}