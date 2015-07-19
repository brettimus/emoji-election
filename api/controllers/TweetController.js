/**
 * TweetController
 *
 * @description :: Server-side logic for managing tweets
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	create: function(req, res) {
        sails.log.info("RECEIVED REQUEST FROM HOST: ", req.baseUrl);

        var data             = req.allParams(),
            original_request = data;

        Tweet.createFromBotData(data, function(err, tweet) {
            if (err) {
                sails.log("ERROR creating tweet from bot data", err);
                return somethingWentWrong(res);
            }

            Vote.createIfFromTweet(tweet, function(err, vote, data) {
                if (err) {
                   sails.log("ERROR creating vote from tweet data", err);
                   return somethingWentWrong(res);
                }

                res.send({
                    original_request: original_request,
                    isNew           : data.isNew,
                    isFirstVote     : data.isFirstVote
                });
            });
        });

    },
};

function somethingWentWrong(res) {
    res.status(500);
    res.send("Something went wrong.");
}