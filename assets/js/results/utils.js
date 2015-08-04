module.exports = {
    munge: munge,
    select: selectByData,
};

function selectByData(name, f) {
    var selector = "[data-result-"+name+"]";
    var elts = document.querySelectorAll(selector);
    Array.prototype.forEach.call(elts, f);
}

function munge(data) {
    data.forEach(_addCounts);
    return data.sort(_sortByCount);
}

function _addCounts(d) {
    d.count = d.values.length;
}
function _sortByCount(a, b) {
    return b.count - a.count;
}