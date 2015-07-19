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
    },

    createFromBotData: function(data, next) {
        var tweet = Tweet.create();
        tweet.exec(function(err, model) {
            if (err) return next(err);
            model.data = JSON.stringify(data);
            model.save(next);
        });
    },
};

