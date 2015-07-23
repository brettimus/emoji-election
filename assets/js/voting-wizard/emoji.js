var utils         = require("./utils"),
    addClickEvent = utils.addClickEvent,
    addClass      = utils.addClass,
    hasClass      = utils.hasClass,
    removeClass   = utils.removeClass;

function addEmojiFormEvents() {
    var emojiChoices = document.querySelectorAll(".voting-wizard-emoji");
    addClickEvent(emojiChoices, selectEmoji);
}

// Emoji Form
addEmojiFormEvents.addNoEmojiError = addNoEmojiError;
module.exports = addEmojiFormEvents;


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