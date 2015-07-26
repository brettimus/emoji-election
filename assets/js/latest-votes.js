var d3 = require("d3");
var Boo = require("boo-templates");
var socketIO = require("./dependencies/socket.io");
var io = require("./dependencies/sails.io")(socketIO);
var moment = require("moment");

var voteTemplateString = document.getElementById("vote-template").innerHTML;
var voteTemplate = new Boo(voteTemplateString);

module.exports = function() {
    d3.json("/vote", loadLatestVotes);
};

function loadLatestVotes(votes) {
    var _domVotes = document.querySelector(".votes");
    votes.forEach(mungeVote);
    
    votes.sort(function(v1, v2) {
        return v1.updatedAtMoment.isBefore(v2.updatedAtMoment) ? 1 : -1;
    }).forEach(appendVote);

    setInterval(updateTimestamps, 300);

    io.socket.get("/results/watch", {}, function(data) {
        console.log("Methinks we're subscribed!", data);
    });

    io.socket.on("vote", function(data) {
        var vote = data.data;
        mungeVote(vote);
        prependVote(vote);
    });

    function mungeVote(v) {
        momentifyTimestamp(v);
        v.updatedAtPretty = v.updatedAtMoment.fromNow();
    }

    function momentifyTimestamp(v) {
        v.updatedAtMoment = moment(v.updatedAt);
    }

    function appendVote(v, i) {
        if (i == null) i = 0;
        var voteHTML = voteTemplate.compile(v);
        var voteNode = voteHTMLToNode(voteHTML);

        voteNode.style.display = "none";
        voteNode.className += " animated";
        _domVotes.appendChild(voteNode);

        setTimeout(function() {
            voteNode.className += " slideInLeft";
            voteNode.style.display = "inherit";
        }, (i+1) * 300);

    }

    function prependVote(v, i) {
        if (i == null) i = 0;
        var voteHTML = voteTemplate.compile(v);
        var voteNode = voteHTMLToNode(voteHTML);
        var firstVoteNode = _domVotes.querySelector(".vote");

        voteNode.style.display = "none";
        voteNode.className += " animated";

        _domVotes
            .insertBefore(voteNode, firstVoteNode);

        setTimeout(function() {
            voteNode.className += " slideInLeft";
            voteNode.style.display = "inherit";
        }, (i+1) * 300);

    }

    function voteHTMLToNode(html) {
        var temp = document.createElement("div");
        temp.innerHTML = html;
        return temp.querySelector(".vote");
    }
}

function updateTimestamps() {
    var elts = document.querySelectorAll("[data-updated-at]:not([data-updated-at='{{updatedAt}}'])");
    Array.prototype.forEach.call(elts, _updateTimestamp);
}

function _updateTimestamp(elt) {
    var time = moment(elt.dataset.updatedAt).fromNow();
    elt.textContent = time;
}

