module.exports = {
    addClass: addClass,
    removeClass: removeClass,
    addClickEvent: addClickEvent,
    toggleClass: toggleClass,
    hasClass: hasClass,
    capitalize: capitalize,
};

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

function isArray(o) {
    return Object.prototype.toString.call(o) === "[object Array]";
}

function isNodeList(o) {
    return Object.prototype.toString.call(o) === "[object NodeList]";
}

function capitalize(str) {
    var firstLetter = str.charAt(0).toUpperCase();
    return firstLetter + str.slice(1);
}