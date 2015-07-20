var votingButton = document.querySelector(".js-toggle-voting-instructions");

addClickEvent(votingButton, toggleVotingInstructions);

function toggleVotingInstructions(evt) {
    console.log(evt);
    var elt = document.querySelector(".voting-instructions-container");
    if (elt.className.indexOf("hidden") !== -1) {
        elt.className = elt.className.replace("hidden", "") + " slideInDown";
    }
    else {
        elt.className = elt.className.replace("slideInDown", "") + " hidden";
    }
}

function addClickEvent(node, handler) {
    node.addEventListener("click", handler);
    node.addEventListener("touchend", handler);
}