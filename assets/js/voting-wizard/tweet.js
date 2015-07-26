var Boo = require("boo-templates");

var utils = require("./utils"),
    addClickEvent = utils.addClickEvent,
    addClass = utils.addClass,
    hasclass = utils.hasClass,
    removeClass = utils.removeClass;

var addNoEmojiError = require("./emoji").addNoEmojiError;

module.exports = function() {
    // Tweet Button (very hacky...)
    var voteButton = document.getElementById("vote-wizard-link");
    addClickEvent(voteButton, goToTwitter);
};

function goToTwitter() {
    var url = buildTweetLink();
    if (validateEmojiForm()) {
        window.location = url; // yeahhhhh i'm ashamed.        
    }
}

function validateEmojiForm() {
    var selectedCount = document.querySelectorAll(".voting-wizard-emoji.selected").length;
    if (selectedCount > 0) {
        return true;
    }
    addNoEmojiError();
}

function buildTweetLink() {

    var text = encodeURIComponent(buildTweetText());

    var baseUrl = "https://twitter.com/intent/tweet?text={{text}}&url={{url}}&via={{bot}}";
    var urlTemplate = new Boo(baseUrl);

    var bot = "emojielection";
    var homePage = "http://demoji.co/";

    var url = urlTemplate.compile({
        text: text,
        bot: bot,
        url: homePage,
    });

    return url;
}

function buildTweetText() {
    var template = "My vote in the Emoji Election: a {{emoji}} for @{{candidate}}. RT to do the same!";
    return (new Boo(template)).compile({
        candidate: getCandidateSelection(),
        emoji    : getEmojiSelection(),
    });
}

// In use?
function getCandidateName() {
    var candidate = document.querySelector("[data-candidate-name]");
    var name = candidate.textContent;
    return name;
}

function getCandidateSelection() {
    var candidate = document.querySelector("[data-candidate-handle]");
    var handle = candidate.dataset.candidateHandle;
    return handle;
}
function getEmojiSelection() {
    var selected = document.querySelectorAll(".voting-wizard-emoji.selected");

    return Array.prototype
        .slice.call(selected, 0, 3)
        .reduce(function(res, elt) {
            return res + elt.textContent;
        }, "");
}