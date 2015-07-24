/**
 * VoteController
 *
 * @description :: Server-side logic for managing votes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    index: function(req, res) {
        Vote.find({ limit: 76 })
            .then(function(votes) {
                res.send(votes);
            })
            .catch(function(err) {
                res.sendStatus(500);
            });
    }
};

