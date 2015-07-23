/**
* Tweet.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

    attributes: {
        data: {
            type: 'json',
        },

        vote: {
            model: 'vote',
        }
    },

    createFromBotData: function(data, next) {
        Tweet.create().exec(function(err, model) {
            if (err) return next(err);
            model.data = data;
            model.save(next);
        });
    },
};

