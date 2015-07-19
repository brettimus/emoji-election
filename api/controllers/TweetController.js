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
                sails.log("ERROR CREATING TWEET FROM BOT DATA!", err);
                res.status(500);
                res.send("Something went wrong.");
                return;
            }

            Vote.createFromTweet(tweet, function(err, vote) {
                if (err) {
                   sails.log("ERROR CREATING VOTE FROM TWEET DATA!", err);
                   res.status(500);
                   res.send("Something went wrong.");
                   return;
                }
                res.send({original_request: data, vote: vote});
            });
        });

    },
};

