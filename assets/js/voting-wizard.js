// TODO - break into modules

smoothScroll.init();

var showWizardButton = document.querySelector("[data-toggle='voting-wizard']");

var nextButton = document.querySelectorAll("[data-next-step]");
var prevButton = document.querySelectorAll("[data-prev-step]");
var voteButton = document.getElementById("vote-wizard-link");

var emojiChoices     = document.querySelectorAll(".voting-wizard-emoji");
var candidateForm = document.querySelector(".voting-wizard-form-candidate");
var randomCandidateButton = document.querySelector("[data-random-candidate]");


// Toggle Wizard
addClickEvent(showWizardButton, toggleVotingWizard);

// Handle Wizard Step Changes
addClickEvent(nextButton, votingWizardNext);
addClickEvent(prevButton, votingWizardPrev);

// Tweet Button (very hacky...)
addClickEvent(voteButton, goToTwitter);

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


// Candidate form
var insertNewCandidate = (function insertNewCandidate(candidates) {
    // create random queue of candidates
    candidates = d3.shuffle(candidates.slice());
    var i = -1;

    return function(evt) {
        var currCandidate,
            candidateName,
            affiliation;

        i = (i + 1) % candidates.length;
        currCandidate = candidates[i];

        setCandidateHandle(currCandidate);
        setCandidateName(currCandidate);
        setCandidateFirstName(currCandidate);
        setCandidateAffil(currCandidate);

    };
})(window._candidates);

insertNewCandidate();
addClickEvent(randomCandidateButton, insertNewCandidate);

function setCandidateHandle(candidate) {
    var handle = candidate.twitter;
    document
        .querySelector("[data-candidate-handle]")
        .dataset
        .candidateHandle = handle;
}
function setCandidateName(candidate) {
    var name = candidate.name;
    var elts = document.querySelectorAll("[data-candidate-name]");

    Array.prototype.forEach.call(elts, function(elt) {
        elt.innerText = name;
    });
}
function setCandidateFirstName(candidate) {
    var name = candidate.name;
    var elts = document.querySelectorAll("[data-candidate-first-name]");

    Array.prototype.forEach.call(elts, function(elt) {
        elt.innerText = name.split(" ")[0];
    });
}
function setCandidateAffil(candidate) {
    var affil = "("+candidate.affiliation.charAt(0).toUpperCase()+")";
    document
        .querySelector("[data-candidate-affiliation]")
        .innerText = affil;
}


// Emoji Form
addClickEvent(emojiChoices, selectEmoji);

function selectEmoji(evt) {
    var selClass = "selected";
    var emoji = evt.target;
    var parent = emoji.parentElement;
    var selectedCount = parent.querySelectorAll(".selected").length;

    if (hasClass(emoji, selClass)) {
        removeClass(emoji, selClass);
        removeEmojiMaxError();
        return;
    }

    if (selectedCount === 2) {
        addEmojiMaxError();
        return;
    }

    addClass(emoji, selClass);
    removeEmojiMaxError();
    removeNoEmojiError();
}


function addEmojiMaxError() {
    var elts = document.querySelectorAll("[data-emoji-form-error='max']");
    Array.prototype.forEach.call(elts, function(elt) {
        removeClass(elt, "hidden");
    });
}

function removeEmojiMaxError() {
    var elts = document.querySelectorAll("[data-emoji-form-error='max']");
    Array.prototype.forEach.call(elts, function(elt) {
        addClass(elt, "hidden");
    });
}

function addNoEmojiError() {
    var elts = document.querySelectorAll("[data-emoji-form-error='blank']");
    Array.prototype.forEach.call(elts, function(elt) {
        removeClass(elt, "hidden");
    });
}

function removeNoEmojiError() {
    var elts = document.querySelectorAll("[data-emoji-form-error='blank']");
    Array.prototype.forEach.call(elts, function(elt) {
        addClass(elt, "hidden");
    });
}



// Voting wizard transitions
// TODO - history api? that'd be lots of work... maybe just use backbone... mehmehmeh

function toggleVotingWizard(evt) {
    var elt = document.querySelector("[data-target='voting-wizard']");
    if (hasClass(elt, "hidden")) {
        removeClass(elt, "hidden");
    }
    else {
        addClass(elt, "hidden");
    }
}


function votingWizardNext(evt) {
    var button = evt.target;
    var elt = getParentStepElt(button);
    var currentStep = getStep(elt);
    var nextStep = currentStep + 1;
    var stepElts = document.querySelectorAll("[data-step]");

    Array.prototype.forEach.call(stepElts, function(elt) {
        step = getStep(elt);
        if (step === nextStep)
            showStep(elt);
        else
            hideStep(elt);
    });
}

function votingWizardPrev(evt) {
    var button = evt.target;
    var elt = getParentStepElt(button);
    var currentStep = getStep(elt);
    var nextStep = currentStep - 1;
    var stepElts = document.querySelectorAll("[data-step]");

    Array.prototype.forEach.call(stepElts, function(elt) {
        step = getStep(elt);
        if (step === nextStep)
            showStep(elt);
        else
            hideStep(elt);
    });

}

function buildTweetLink() {

    var text = encodeURIComponent(buildTweetText());

    var baseUrl = "https://twitter.com/intent/tweet?text={{text}}&url={{url}}&via={{bot}}";
    var urlTemplate = new BooTemplate(baseUrl);

    var bot = "emojielection";
    var homePage = encodeURIComponent("http://emojifor.us/president");

    var url = urlTemplate.compile({
        text: text,
        bot: bot,
        url: homePage,
    });

    return url;
    // document.getElementById("vote-wizard-link").href = url;
}

function buildTweetText() {
    var template = "I vote {{emoji}} for @{{candidate}}. RT to do the same!";
    return (new BooTemplate(template)).compile({
        candidate: getCandidateSelection(),
        emoji    : getEmojiSelection(),
    });
}

function getCandidateName() {
    var candidate = document.querySelector("[data-candidate-name]");
    var name = candidate.innerText;
    return name;
}
function getCandidateSelection() {
    var candidate = document.querySelector("[data-candidate-handle]");
    var handle = candidate.dataset.candidateHandle;
    return handle;
}
function getEmojiSelection() {
    var selected = document.querySelectorAll(".voting-wizard-emoji.selected");
    if (selected.length === 0) {
        return getRandomEmoji();
    }

    return Array.prototype
        .slice.call(selected, 0, 2)
        .reduce(function(res, elt) {
            return res + elt.innerText;
        }, "");

}
function getRandomEmoji() {
    var emoji = emojiOptions();
    var i = Math.floor(Math.random()*emoji.length);
    return emoji[i];
}
function emojiOptions() {
    return "😁 😻 💩 🇺🇸 🙈 😞 😱 🎉 💰 💸 🚫 😐 😎 😨".split(" ");
}

// Utilities
function getStep(elt) {
    return parseInt(elt.dataset.step, 10);
}

function hideStep(elt) {
    addClass(elt, "voting-wizard-step-hidden");
}

function showStep(elt) {
    removeClass(elt, "voting-wizard-step-hidden");
}

function addClickEvent(node, handler) {
    if (!node) return;
    if (isArray(node) || isNodeList(node)) {
        Array.prototype.forEach.call(node, function(elt) {
            _addClickEventHelper(elt, handler);
        });
    }
    else {
        _addClickEventHelper(node, handler);
    }
}

function _addClickEventHelper(elt, handler) {
    if ("ontouchstart" in window) {
        elt.addEventListener("touchend", handler);
    }
    else {
        elt.addEventListener("click", handler);
    }
}

function addClass(node, className) {
    if (hasClass(node, className)) return;
    node.className += (" " + className);
}

function removeClass(node, className) {
    var classes    = node.className.split(" ");
    var modClasses = classes.filter(function(c) {
        return c !== className;
    });
    node.className = modClasses.join(" ");
}

function toggleClass(node, className) {
    if (hasClass(node, className))
        removeClass(node, className);
    else
        addClass(node, className);
}

function hasClass(node, className) {
    var classes = node.className.split(" ");
    return classes.some(function(c) {
        return c === className;
    });
}

function getParentStepElt(elt) {
    var stepClass = "js-wizard-step";
    do {
        if (hasClass(elt, stepClass))
            return elt;
        elt = elt.parentElement;
    } while (elt.parentElement);
}

// EMOJI

// DOM utilities

// General Utilities

function randomFromArray(ary) {
    return ary[Math.floor(Math.random()*ary.length)];
}

function isArray(o) {
    return Object.prototype.toString.call(o) === "[object Array]";
}

function isNodeList(o) {
    return Object.prototype.toString.call(o) === "[object NodeList]";
}