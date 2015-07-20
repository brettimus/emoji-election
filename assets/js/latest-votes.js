var voteTemplateString = document.getElementById("vote-template").innerHTML;
var voteTemplate = new BooTemplate(voteTemplateString);

d3.json("/vote", function(votes) {
    var _domVotes = document.querySelector(".votes"),
        _tempElt  = document.createElement("div");

    votes.forEach(momentifyTimestamp);
    
    votes.sort(function(v1, v2) {
        return v1.createdAtMoment.isBefore(v2.createdAtMoment) ? 1 : -1;
    }).forEach(appendVote);

    function momentifyTimestamp(v) {
        v.createdAtMoment = moment(v.createdAt);
    }

    function appendVote(v, i) {
        var toAppend;
        v.createdAtPretty = v.createdAtMoment.fromNow();
        _tempElt.innerHTML = voteTemplate.compile(v);
        toAppend = _tempElt.querySelector(".vote");
        toAppend.style.display = "none";
        _domVotes.appendChild(toAppend);
        
        setTimeout(function() {
            toAppend.style.display = "inherit";
        }, (i+1) * 300);

        _tempElt.innerHTML = "";
    }
});

