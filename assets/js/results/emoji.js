var emojiRegex = require("emoji-regex");
var select = require("./utils").select;

module.exports = emojiResults;

function emojiResults(data) {
    if (!data || !data.length) {
        console.log("No results");
        return;
    }

    var max = data[0].count;
    var weighted = weightedEmoji(data);

    select("emoji", function(elt) {
        elt.innerHTML = weighted[0].emoji;
    });

    select("emoji-count", function(elt) {
        elt.innerHTML = weighted.length;
    });
}

function weightedEmoji(data) {
    var ledger = Object.create(null),
        result = [];

    data.forEach(function(d) {
        tallyVote(ledger, d.key);
    });

    for (var emoji in ledger) {
        result.push({
            emoji: emoji,
            score: ledger[emoji],
        });
    }

    return result.sort(byScore);
}

function tallyVote(ledger, vote) {
    var matches = vote.match(emojiRegex());
    var scale = matches.length;
    matches.forEach(function(m) {
        if (!ledger[m]) ledger[m] = 0;
        ledger[m] += (1/scale);
    });
}

function byScore(a, b) {
    return b.score - a.score;
}