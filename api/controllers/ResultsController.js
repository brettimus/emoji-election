/**
 * ResultsController
 *
 * @description :: Server-side logic for managing results
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	
  /**
   * `ResultsController.index()`
   */
  index: function (req, res) {
    Vote.count({}).exec(function(err, count) {
      if (err) return res.view("500");
      res.view("results", {count: count});
    });
  },

  all: function (req, res) {
    Vote.find({}).exec(function(err, votes) {
      if (err) return res.render("500");
      res.json({
        votes: votes,
      });
    });
  },

  emoji: function (req, res) {
    var em = req.param("emoji");
    var qry = {
      emoji: {contains: em,},
    };
    var pqs = parallelQuery(render, error);
    Vote.count(qry)
        .exec(pqs(tCount));
    Vote.find(qry)
        .exec(pqs(tVotes));


    function render(payload) {
      res.json(payload);
    }
    function error(err) {
      res.render(500);
    }
    function tCount(c) {
      return {count: c,};
    }
    function tVotes(vs) {
      vs = vs || [];
      return {votes: vs};
    }
    function I(f) { return f; }
  },

  candidate: function (req, res) {
    var can = req.param("candidate");
    Vote.count({
      candidate: can,
    })
    .then(renderWithCount)
    .catch(error);

    function renderWithCount(count) {
      res.json({
        count: count,
      });
    }
    function error(err) {
      res.render(500);
    }
  },

  watch: function(req, res) {
    if (!req.isSocket) {
        return res.json({
          message: 'This is a socket endpoint!'
        });
    }

    Vote.watch(req);

    res.json({
        message: "Connected",
    });

  }
};


function parallelQuery(load, fail) {
  var n = 0,
      i = 0,
      payload = {},
      args = Array.prototype.slice.call(arguments);

  if (args.length > 2) {
    args.slice(2).forEach(paralleler);
  }

  return paralleler;

  function paralleler(transform) {
    n++;
    return function(err, result) {
      if (err) return fail(err);
      i++;
      _.assign(payload, transform(result));
      if (i === n) return load(payload);
    };
  }
}


