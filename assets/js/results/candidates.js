var candidates = require("us-presidential-candidates-2016");
var select = require("./utils").select;

module.exports = candidateResults;

function candidateResults(data) {
    var top = data[0];
    var handle = top.key;
    var can = candidates.where({twitter: handle});
    if (can) can = can[0];

    select("candidate-count", function(elt) {
        elt.innerHTML = data.length;
    });

    select("candidate", function(elt) {
        elt.innerHTML = can.name;
    });
}