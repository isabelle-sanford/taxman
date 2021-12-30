interface PotNumber {
  val: number;
  available: boolean;
  cell: any;
  taxman?: boolean;
  player?: boolean;
}

let pot: PotNumber[] = [];

$("#button").click(function () {
  console.log("running enter...");

  let potSize = Number($("#taxman-size").val()); // convert to num?

  console.log(potSize);

  //   if (typeof potSize != "number") {
  //     console.log("Not number!" + typeof potSize);
  //     return;
  //   }

  let numFullRows = Math.round(potSize / 10 - 1); // not sure the round is needed
  for (let i = 0; i <= numFullRows; i++) {
    let row = $("<tr></tr>");

    for (let j = 0; j < 10; j++) {
      let num = i * 10 + j + 1;
      if (num > potSize) {
        break;
      }
      let cell = $("<td></td>")
        .text(num)
        .attr("id", "n" + num)
        .addClass("available"); // remember not to do this on 1

      pot.push({ val: num, available: true, cell: cell });

      row.append(cell);
    }
    $("tbody").append(row);
  }

  pot[0].available = false;
  pot[0].taxman = true;
  pot[0].cell
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
  //console.log(pot);
});
