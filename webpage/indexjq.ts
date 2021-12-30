// // let myPot: PotNums[];
// // let playerScore: number = 0;
// // let taxScore: number = 0;

// // Statuses: not picked, has factors remaining (available)
// // not picked, no unpicked factors (unavailable)
// // picked, by player
// // picked, by taxman
// // could just do numerical 1-4?

// interface PotNumber {
//   // maybe make class instead?
//   val: number;
//   available: boolean; // ie has divs left
//   cell: any;
//   divs: number[];
//   picked: boolean;
//   taxman?: boolean;
//   player?: boolean;
// }
// let scores = { taxman: 0, player: 0 };
// let pot: PotNumber[] = [];

// // -----------

// function getDivs(n: number): number[] {
//   let rtn = [1];

//   for (let i = 2; i <= Math.sqrt(n); i++) {
//     if (n % i == 0) {
//       rtn.push(i);
//     }
//   }

//   return rtn;
// }

// function pickNum(n: number): void {
//   let picked = pot[n - 1];

//   if (!picked.available) {
//     return;
//   }

//   picked.available = false;
//   picked.picked = true;
//   picked.player = true;
//   picked.cell
//     .css("background-color", "red")
//     .addClass("unavailable")
//     .removeClass("available");

//   console.log(picked.divs);
//   // need to search and find newly unavailable nums
//   for (let i of picked.divs) {
//     let thisDiv = pot[i - 1];
//     if (!thisDiv.picked) {
//       thisDiv.picked = true;
//       thisDiv.taxman = true;
//       thisDiv.available = false;
//       thisDiv.cell
//         .addClass("unavailable")
//         .removeClass("available")
//         .css("background-color", "gray");
//     }
//   }
// }

// $("#button").click(function () {
//   console.log("running enter...");

//   let potSize = Number($("#taxman-size").val()); // convert to num?

//   console.log(potSize);

//   let numFullRows = Math.round(potSize / 10 - 1); // not sure the round is needed
//   for (let i = 0; i <= numFullRows; i++) {
//     let row = $("<tr></tr>");

//     for (let j = 0; j < 10; j++) {
//       let num = i * 10 + j + 1;
//       if (num > potSize) {
//         break;
//       }
//       let cell = $("<td></td>")
//         .text(num)
//         .attr("id", "n" + num)
//         .addClass("available"); // remember not to do this on 1

//       pot.push({
//         val: num,
//         available: true,
//         cell: cell,
//         divs: getDivs(num),
//         picked: false,
//       });

//       row.append(cell);
//     }
//     $("tbody").append(row);
//   }

//   pot[0].available = false;
//   pot[0].taxman = true;
//   pot[0].cell
//     .addClass("unavailable")
//     .removeClass("available")
//     .css("background-color", "blue");

//   $("td").on({
//     mouseenter: function () {
//       console.log($(this));
//       let t = pot[Number($(this).text()) - 1];
//       if (t.available) {
//         $(this).css("background-color", "green");

//         $("td")
//           .filter(function () {
//             return t.divs.includes(Number($(this).text()));
//           })
//           .filter(function () {
//             return pot[Number($(this).text()) - 1].available;
//           })
//           .css("background-color", "pink");
//       }
//     },
//     mouseleave: function () {
//       let t = pot[Number($(this).text()) - 1];
//       if (t.available) {
//         $(this).css("background-color", "white");
//         $("td")
//           .filter(function () {
//             return t.divs.includes(Number($(this).text()));
//           })
//           .filter(function () {
//             return pot[Number($(this).text()) - 1].available;
//           })
//           .css("background-color", "white");
//       }
//     },
//     click: function () {
//       pickNum(Number($(this).text()));
//     },
//   });
//   //console.log(pot);
// });
