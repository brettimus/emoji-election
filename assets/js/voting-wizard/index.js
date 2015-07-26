var utils         = require("./utils"),
    addClickEvent = utils.addClickEvent,
    addClass      = utils.addClass,
    hasClass      = utils.hasClass,
    removeClass   = utils.removeClass;

module.exports = function() {
    require("./apparate")();
    require("./navigate")();
    require("./tweet")();
    require("./candidates")();
    require("./emoji")();
};

