module.exports = function isBot(req, res, next) {
  var botKey = req.param('bot_key');

  if (botKey !== process.env.BOT_KEY) {
    return res.forbidden();
  }
  next();
};