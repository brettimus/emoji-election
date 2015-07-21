// Click button to summon wizard
var votingButton = document.querySelector("[data-toggle='voting-wizard']");
var nextButton   = document.querySelectorAll("[data-next-step]");
var prevButton   = document.querySelectorAll("[data-prev-step]");

addClickEvent(votingButton, toggleVotingWizard);

function toggleVotingWizard(evt) {
    console.log(evt);
    var elt = document.querySelector("[data-target='voting-wizard']");
    if (hasClass(elt, "hidden")) {
        removeClass(elt, "hidden");
    }
    else {
        addClass(elt, "hidden");
    }
}

// Handle Step Changes
addClickEvent(nextButton, votingWizardNext);
addClickEvent(prevButton, votingWizardPrev);

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

    buildTweetLink();
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
    var text = "Testing 123\n";
    var bot = "emojielection";
    var eePage = encodeURIComponent("http://emojifor.us/president");
    var baseUrl = "https://twitter.com/intent/tweet?text={{text}}&url={{url}}&via={{bot}}";
    var urlTemplate = new BooTemplate(baseUrl);
    var url = urlTemplate.compile({
        text: text,
        bot: bot,
        url: eePage,
    });

    document.getElementById("vote-wizard-link").href = url;
}


// Utilities
function getStep(elt) {
    return parseInt(elt.dataset.step, 10);
}

function hideStep(elt) {
    addClass(elt, "hidden");
}

function showStep(elt) {
    removeClass(elt, "hidden");
}

function addClickEvent(node, handler) {
    if (!node) return;
    if (isArray(node) || isNodeList(node)) {
        Array.prototype.forEach.call(node, function(elt) {
            elt.addEventListener("click", handler);
            elt.addEventListener("touchend", handler);
        });
    }
    else {
        node.addEventListener("click", handler);
        node.addEventListener("touchend", handler);
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

function isArray(o) {
    return Object.prototype.toString.call(o) === "[object Array]";
}

function isNodeList(o) {
    return Object.prototype.toString.call(o) === "[object NodeList]";
}