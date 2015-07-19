/**
 * VoteController
 *
 * @description :: Server-side logic for managing votes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	handleTweet: function(req, res) {
        var text = req.param("text");
        console.log("HOLY SHIT I GOTS IT: ", text);
        res.send("Dude");
    }
};

