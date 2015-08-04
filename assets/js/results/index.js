var candidateResults = require("./candidates");
var emojiResults = require("./emoji");
var munge = require("./utils").munge;

module.exports = function() {
    d3.json("/results/all", results);
};

function results(data) {
    console.log(data);
    var votes = data.votes;
    var votesByEmoji = d3.nest()
        .key(function(d) {
            return d.emoji;
        })
        .entries(votes);

    var votesByCandidate = d3.nest()
        .key(function(d) {
            return d.candidate;
        })
        .entries(votes);

    emojiResults(munge(votesByEmoji));
    candidateResults(munge(votesByCandidate));

    // votesByCandidate = munge(votesByCandidate);
    // debugger;
}

