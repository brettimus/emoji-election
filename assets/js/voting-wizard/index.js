var utils         = require("./utils"),
    addClickEvent = utils.addClickEvent,
    addClass      = utils.addClass,
    hasClass      = utils.hasClass,
    removeClass   = utils.removeClass;

module.exports = function() {
    var showWizardButton = document.querySelector("[data-toggle='voting-wizard']");
    addClickEvent(showWizardButton, showVotingWizard);

    require("./navigate")();
    require("./tweet")();
    require("./candidates")();
    require("./emoji")();
};

// Voting wizard transitions
//
// TODO - tap into that history api? it sucks if the user hits back and isn't at their form.
//      - that'd be lots of work... maybe just... use backbone... mehmehmeh

function showVotingWizard(evt) {
    var elt = document.querySelector("[data-target='voting-wizard']");
    removeClass(elt, "voting-wizard-container");
}

