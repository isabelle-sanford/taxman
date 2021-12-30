"use strict";
// class PotNumber1 {
//   val: number;
//   picked: boolean;
//   cell: any;
//   constructor(v: number, c: any) {
//     this.val = v;
//     this.cell = c;
//     this.picked = false;
//   }
//   pick(): void {
//     this.picked = true;
//   }
// }
// // Select the button
// let button = d3.select("#button");
// // Select the form
// let form = d3.select("#form");
// // Create event handlers
// button.on("click", runEnter);
// form.on("submit", runEnter);
// let pot1: PotNumber1[];
// // Complete the event handler function for the form
// function runEnter() {
//   console.log("Running enter...");
//   // Prevent the page from refreshing
//   d3.event.preventDefault();
//   // Select the input element and get the raw HTML node
//   let inputElement = d3.select("#taxman-size");
//   console.log("Input element: " + inputElement);
//   // Get the value property of the input element
//   let inputValue = inputElement.property("value");
//   console.log("Input value: " + inputValue);
//   let table = d3.select("tbody");
//   table.html("");
//   let numFullRows = Math.round(inputValue / 10 - 1); // not sure the round is needed
//   for (let i = 0; i < numFullRows; i++) {
//     let row = table.append("tr");
//     for (let j = 0; j <= 10; j++) {
//       let cell = row.append("td");
//       let num = i * 10 + j + 1;
//       let c = new PotNumber(num, cell);
//       pot1.push(c);
//       cell.text(num); // starting at 1!
//       cell.attr("class", "available");
//       cell.attr("id", "n" + num); //ew
//       cell.on("click", playerPick);
//     }
//   }
//   let lastRow = table.append("tr");
//   for (let k = 0; k < inputValue % 10; k++) {
//     let cell = lastRow.append("td");
//     let num = numFullRows * 10 + k + 1;
//     let c = new PotNumber(num, cell);
//     pot.push(c);
//     cell.text(num);
//     cell.attr("class", "available");
//     cell.attr("id", "n" + num); //ew
//     cell.on("click", playerPick);
//   }
// }
// let table = d3.select("tbody");
// let tableEvent = table.on("mouseover", highlighting);
// let tableClick = table.on("click", playerPick);
// function playerPick() {
//   console.log("picked a thing!");
//   d3.selectAll(".available").on("click", function () {
//     d3.select(this)
//       .style("background-color", "green")
//       .attr("class", "unavailable");
//   });
//   //d3.select("#n" + num).style('background', 'black');
// }
// function highlighting() {
//   d3.selectAll(".available")
//     .on("mouseover", function () {
//       d3.select(this).style("background-color", "orange");
//       // Get current event info
//       console.log(d3.event);
//       // Get x & y co-ordinates
//       console.log(d3.mouse(this));
//     })
//     .on("mouseout", function () {
//       // IF THIS IS AVAILABLE
//       d3.select(this).style("background-color", "white");
//     });
// }
