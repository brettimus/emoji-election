/**
 * TweetController
 *
 * @description :: Server-side logic for managing tweets
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	create: function(req, res) {
        var data = req.allParams();

        Tweet.createFromBotData(data, function(err, tweet) {
            if (err) {
                sails.log("ERROR creating tweet from bot data", err);
                return somethingWentWrong(res);
            }

            Vote.createFromTweet(tweet, function(err, vote, isNew) {
                if (err) {
                   sails.log("ERROR creating vote from tweet data", err);
                   return somethingWentWrong(res);
                }

                res.send({original_request: data, isNew: isNew});
            });
        });

    },
};

function somethingWentWrong(res) {
    res.status(500);
    res.send("Something went wrong.");
}