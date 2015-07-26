var utils         = require("./utils"),
    addClickEvent = utils.addClickEvent,
    addClass      = utils.addClass,
    removeClass   = utils.removeClass;

module.exports = function apparate() {

    var showWizardButton = document.querySelector("[data-toggle='voting-wizard']");
    addClickEvent(showWizardButton, showVotingWizard);

    if (window.location.hash === "#voting-wizard") {
        showVotingWizard();
    }

    function showVotingWizard(evt) {
        var elt = document.querySelector("[data-target='voting-wizard']");
        removeClass(elt, "voting-wizard-container-hidden");
    }
    
};

// TODO - tap into that history api? it sucks if the user hits back and isn't at their form.
//      - that'd be lots of work... maybe just... use backbone... mehmehmeh
