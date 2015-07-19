/**
 * TweetController
 *
 * @description :: Server-side logic for managing tweets
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	create: function(req, res) {
        console.log("YOOOO");
        var allParams = req.allParams();
        console.log(allParams);
        res.send({
            original_request: allParams,
        });
    },
};

