"use strict";
class Pot {
    constructor(potsize) {
        this.size = potsize;
        this.playerScore = 0;
        this.taxScore = 0;
        this.nums = []; // unnecessary?
        // this could have better variables
        for (let i = 1; i <= potsize; i++) {
            let cell = $("<td></td>")
                .text(i)
                .addClass("available")
                .attr("id", "n" + i); // necessary?
            // calculate multiples
            let multiplesList = [];
            for (let j = i * 2; j < potsize; j += i) {
                multiplesList.push(j);
            }
            this.nums.push(new PotNums(i, cell, multiplesList));
        }
    }
    pick(n) {
        console.log("picking " + n);
        if (n > this.size) {
            return null;
        }
        let curr = this.nums[n - 1];
        // probably don't need both clauses here
        if (curr.availableFactors < 1 || curr.playerPicked != null) {
            console.log("that number is already picked! " + n);
            return null;
        }
        curr.pick();
        this.playerScore += n;
        for (let i of curr.multiples) {
            this.nums[i - 1].availableFactors--; // can this go below 0?
        }
        for (let j of curr.factors) {
            this.nums[j - 1].tax();
        }
        // check + mark new unpickables (or just check during decrements?)
        for (let k of this.nums) {
            if (k.availableFactors < 1) {
                k.cell.addClass("unavailable").removeClass("available");
            }
        }
    }
    tax(n) {
        if (n > this.size) {
            return null;
        }
        let curr = this.nums[n - 1];
        if (curr.playerPicked != null) {
            return null;
        }
        this.taxScore += n;
        curr.tax();
        for (let i of curr.multiples) {
            this.nums[i - 1].availableFactors--;
        }
    }
}
class PotNums {
    constructor(myVal, myCell, multiplesList) {
        this.val = myVal;
        this.cell = myCell;
        this.factors = getDivs(myVal);
        this.multiples = multiplesList;
        this.availableFactors = this.factors.length; // ?
        this.playerPicked = null;
    }
    pick() {
        this.playerPicked = true;
        this.cell.addClass("picked").removeClass("available");
    }
    tax() {
        this.playerPicked = false;
        this.cell.addClass("taxed").removeClass("available");
        // currently no need to recurse down through factors
    }
}
function getDivs(n) {
    let rtn = [1];
    for (let i = 2; i <= Math.sqrt(n); i++) {
        if (n % i == 0) {
            rtn.push(i);
            rtn.push(n / i);
        }
    }
    return rtn;
}
$("#button").on({
    click: () => {
        let potSize = Number($("#taxman-size").val()); // catch non-num error
        console.log("pot size: " + potSize);
        let p = new Pot(potSize);
        let rowWidth = 10; // ehh
        // ! NEED TO REMEMBER TO CLEAR TABLE
        let numRows = Math.round(potSize / 10); // not sure the round is needed
        let cells = p.nums.map(function (n) {
            return n.cell;
        });
        console.log("first cell: ");
        console.log(cells[0]);
        for (let i = 0; i <= numRows; i++) {
            let row = $("<tr></tr>");
            // probably more elegant way to do this
            for (let j = 0; j < rowWidth; j++) {
                let curr = i * 10 + j;
                if (curr >= potSize) {
                    break;
                }
                row.append(cells[curr][0]); // not sure about index?
            }
            $("tbody").append(row);
        }
        // ?might need to set n=1 to be unavailable?
        $("td").on({
            // is text() really the best thing to pull?
            mouseenter: function () {
                let cellnum = Number($(this).text());
                // console.log("hovering over " + cellnum);
                let t = p.nums[cellnum - 1];
                if (t.availableFactors > 0) {
                    //t.cell.css("background-color", "green"); // do this with css onhover?
                    $("td")
                        .filter(function () {
                        let facnum = Number($(this).text());
                        return (t.factors.includes(facnum) &&
                            p.nums[facnum - 1].playerPicked == null);
                    })
                        .addClass("hovered");
                }
            },
            mouseleave: function () {
                let cellnum = Number($(this).text());
                let t = p.nums[cellnum - 1];
                if (t.availableFactors > 0) {
                    // necessary?
                    //t.cell.css("background-color", "white"); // do this with css onhover?
                    $("td").removeClass("hovered");
                }
            },
            click: function () {
                p.pick(Number($(this).text()));
            },
        });
    },
});
