var voteTemplateString = document.getElementById("vote-template").innerHTML;
var voteTemplate = new BooTemplate(voteTemplateString);

d3.json("/vote", function(votes) {
    var _domVotes = document.querySelector(".votes");
    votes.forEach(mungeVote);
    
    votes.sort(function(v1, v2) {
        return v1.createdAtMoment.isBefore(v2.createdAtMoment) ? 1 : -1;
    }).forEach(appendVote);


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
        v.createdAtPretty = v.createdAtMoment.fromNow();
    }

    function momentifyTimestamp(v) {
        v.createdAtMoment = moment(v.createdAt);
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
});

