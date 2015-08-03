/**
 * HomeController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    index: function(req, res) {
        Vote
        .count()
        .exec(function(err, count) {
            if (err) return res.view("500");
            res.view("homepage", {count: count});
        });
    },
};