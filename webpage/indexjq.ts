$("#button").click(function () {
  console.log("running enter...");

  let potSize = $("#taxman-size").val(); // convert to num?

  console.log(potSize);

  let numFullRows = Math.round(potSize / 10 - 1); // not sure the round is needed
  for (let i = 0; i <= numFullRows; i++) {
    let row = $("<tr></tr>");
    console.log("added a row");

    for (let j = 0; j < 10; j++) {
      let num = i * 10 + j + 1;
      if (num > potSize) {
        break;
      }
      let cell = $("<td></td>")
        .text(num)
        .attr("id", "n" + num)
        .addClass("available"); // remember not to do this on 1

      row.append(cell);
    }
    $("tbody").append(row);
  }

  $("td")
    .first()
    .addClass("unavailable")
    .removeClass("available")
    .css("background-color", "red");

  $("td").on({
    mouseenter: function () {
      if ($(this).hasClass("available")) {
        $(this).css("background-color", "green");
      }
    },
    mouseleave: function () {
      if ($(this).hasClass("available")) {
        $(this).css("background-color", "white");
      }
    },
    click: function () {
      $(this)
        .css("background-color", "red")
        .addClass("unavailable")
        .removeClass("available");
    },
  });
});
