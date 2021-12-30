// let myPot: PotNums[];
// let playerScore: number = 0;
// let taxScore: number = 0;
var scores = { taxman: 0, player: 0 };
var pot = [];
// -----------
function getDivs(n) {
    var rtn = [1];
    for (var i = 2; i <= Math.sqrt(n); i++) {
        if (n % i == 0) {
            rtn.push(i);
        }
    }
    return rtn;
}
function pickNum(n) {
    var picked = pot[n - 1];
    if (!picked.available) {
        return;
    }
    picked.available = false;
    picked.picked = true;
    picked.player = true;
    picked.cell
        .css("background-color", "red")
        .addClass("unavailable")
        .removeClass("available");
    console.log(picked.divs);
    // need to search and find newly unavailable nums
    for (var _i = 0, _a = picked.divs; _i < _a.length; _i++) {
        var i = _a[_i];
        var thisDiv = pot[i - 1];
        if (!thisDiv.picked) {
            thisDiv.picked = true;
            thisDiv.taxman = true;
            thisDiv.available = false;
            thisDiv.cell
                .addClass("unavailable")
                .removeClass("available")
                .css("background-color", "gray");
        }
    }
}
$("#button").click(function () {
    console.log("running enter...");
    var potSize = Number($("#taxman-size").val()); // convert to num?
    console.log(potSize);
    var numFullRows = Math.round(potSize / 10 - 1); // not sure the round is needed
    for (var i = 0; i <= numFullRows; i++) {
        var row = $("<tr></tr>");
        for (var j = 0; j < 10; j++) {
            var num = i * 10 + j + 1;
            if (num > potSize) {
                break;
            }
            var cell = $("<td></td>")
                .text(num)
                .attr("id", "n" + num)
                .addClass("available"); // remember not to do this on 1
            pot.push({
                val: num,
                available: true,
                cell: cell,
                divs: getDivs(num),
                picked: false
            });
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
            var t = pot[Number($(this).text()) - 1];
            if (t.available) {
                $(this).css("background-color", "green");
                $("td")
                    .filter(function () {
                    return t.divs.includes(Number($(this).text()));
                })
                    .filter(function () {
                    return pot[Number($(this).text()) - 1].available;
                })
                    .css("background-color", "pink");
            }
        },
        mouseleave: function () {
            var t = pot[Number($(this).text()) - 1];
            if (t.available) {
                $(this).css("background-color", "white");
                $("td")
                    .filter(function () {
                    return t.divs.includes(Number($(this).text()));
                })
                    .filter(function () {
                    return pot[Number($(this).text()) - 1].available;
                })
                    .css("background-color", "white");
            }
        },
        click: function () {
            pickNum(Number($(this).text()));
        }
    });
    //console.log(pot);
});
