var votingButton = document.querySelector(".js-toggle-voting-instructions");

addClickEvent(votingButton, toggleVotingInstructions);

function toggleVotingInstructions(evt) {
    console.log(evt);
    var elt = document.querySelector(".voting-instructions");
    elt.className = elt.className.replace("hidden", "") + " slideInDown";
}

function addClickEvent(node, handler) {
    node.addEventListener("click", handler);
    node.addEventListener("touchend", handler);
}