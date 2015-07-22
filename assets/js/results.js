// d3.json("/vote", function(data) {
//     console.log(data);
//     var t = d3
//         .selectAll(".table-container")
//         .data([data.concat])
//         // .enter()
//         .append("svg");

//     console.log("meh.", t);

//     var groupedData = d3.nest()
//         .key(function(d) { return d.candidate; })
//         .key(function(d) { return d.emoji; })
//         .entries(data);

//     console.log("groupedData: ", groupedData);
//     var body = d3.select("body");
//     groupedData.forEach(function(candidate) {
//         // body
//         //     .append("p")
//         //     .text(candidate.key);

//         candidate.values.forEach(function(emoji) {
//             var html = "&bull; Has "+emoji.values.length+" "+emoji.key+" votes";
//             console.log(html);
//             // body.append("p").html(html);
//         });

//         // body
//             // .append("hr");
//     });
// });