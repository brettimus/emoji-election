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
    return res.json({
      todo: 'index() is not implemented yet!'
    });
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

