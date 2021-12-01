// Select the button
var button = d3.select("#button");

// Select the form
var form = d3.select("#form");

// Create event handlers
button.on("click", runEnter);
form.on("submit", runEnter);

// Complete the event handler function for the form
function runEnter() {
  console.log("Running enter...");
  // Prevent the page from refreshing
  d3.event.preventDefault();

  // Select the input element and get the raw HTML node
  var inputElement = d3.select("#taxman-size");

  console.log("Input element: " + inputElement);

  // Get the value property of the input element
  var inputValue = inputElement.property("value");

  console.log("Input value: " + inputValue);

  let table = d3.select("tbody");
  table.html("");

  for (let i = 0; i <= inputValue / 10; i++) {
    let row = table.append("tr");
    for (let j = 0; j <= 10; j++) {
      let cell = row.append("td");
      cell.text(i * 10 + j);
    }
  }
}
