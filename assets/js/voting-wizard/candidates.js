var d3 = require("d3");

var utils         = require("./utils"),
    addClickEvent = utils.addClickEvent,
    addClass      = utils.addClass,
    hasClass      = utils.hasClass,
    removeClass   = utils.removeClass,
    capitalize    = utils.capitalize;

module.exports = function() {
    var candidateForm         = document.querySelector(".voting-wizard-form-candidate");
    var randomCandidateButton = document.querySelector("[data-random-candidate]");

    var insertNewCandidate = (function insertNewCandidate() {
        // create random queue of candidates
        var candidates = require("us-presidential-candidates-2016");
        candidates = d3.shuffle(candidates.slice());
        var i = -1;

        return function(evt) {
            var currCandidate,
                candidateName,
                affiliation;

            i = (i + 1) % candidates.length;
            currCandidate = candidates[i];

            animateCandidateElt();

            setCandidateHandle(currCandidate);
            setCandidateName(currCandidate);
            setCandidateFirstName(currCandidate);
            setCandidateAffil(currCandidate);
            // setCandidateDescription(currCandidate);

        };
    })();

    insertNewCandidate();
    addClickEvent(randomCandidateButton, insertNewCandidate);
};

function animateCandidateElt() {
    // pass
}

function _jello() {
   var elt = document.querySelector(".voting-wizard-form-candidate.animated");
   removeClass(elt, "jello");
   process.nextTick(function() {
       addClass(elt, "jello");
   });
}

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
        elt.textContent = name;
    });
}
function setCandidateFirstName(candidate) {
    var name = candidate.name;
    var elts = document.querySelectorAll("[data-candidate-first-name]");

    Array.prototype.forEach.call(elts, function(elt) {
        elt.textContent = name.split(" ")[0];
    });
}
function setCandidateAffil(candidate) {
    var affil = "("+capitalize(candidate.affiliation)+")";
    document
        .querySelector("[data-candidate-affiliation]")
        .textContent = affil;
}
function setCandidateDescription(candidate) {
    var affil = candidate.description;
    document
        .querySelector("[data-candidate-description]")
        .textContent = affil;
}


