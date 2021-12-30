var _this = this;
// interface or class?
var Pot = /** @class */ (function () {
    function Pot(n) {
        console.log("making the pot...");
        this.size = n;
        this.playerScore = 0;
        this.taxScore = 0;
        this.nums = []; // unnecessary?
        // this could have better variables
        for (var i = 1; i <= n; i++) {
            //console.log("making num " + i);
            var cell = $("<td></td>")
                .text(i)
                .attr("id", "n" + i);
            // calculate multiples
            var m = [];
            for (var j = i * 2; j < n; j += i) {
                m.push(j);
            }
            this.nums.push(new PotNums(i, cell, m));
        }
        console.log("nums made!");
    }
    Pot.prototype.pick = function (n) {
        if (n > this.size) {
            return null;
        }
        var curr = this.nums[n - 1];
        // probably don't need both clauses here
        if (curr.availableFactors < 1 || curr.playerPicked != null) {
            return null;
        }
        curr.pick();
        this.playerScore += n;
        for (var _i = 0, _a = curr.multiples; _i < _a.length; _i++) {
            var i = _a[_i];
            this.nums[i - 1].availableFactors--; // can this go below 0?
        }
        for (var _b = 0, _c = curr.factors; _b < _c.length; _b++) {
            var j = _c[_b];
            this.nums[j - 1].tax();
        }
        // check + mark new unpickables (or just check during decrements?)
        for (var _d = 0, _e = this.nums; _d < _e.length; _d++) {
            var k = _e[_d];
            if (k.availableFactors < 1) {
                k.cell.addClass("unavailable");
            }
        }
    };
    Pot.prototype.tax = function (n) {
        if (n > this.size) {
            return null;
        }
        var curr = this.nums[n - 1];
        if (curr.playerPicked != null) {
            return null;
        }
        this.taxScore += n;
        curr.tax();
        for (var _i = 0, _a = curr.multiples; _i < _a.length; _i++) {
            var i = _a[_i];
            this.nums[i - 1].availableFactors--;
        }
    };
    return Pot;
}());
var PotNums = /** @class */ (function () {
    function PotNums(v, c, m) {
        // might need potsize (for multiples)
        this.val = v;
        this.cell = c;
        this.factors = getDivs(v);
        this.multiples = m;
        this.availableFactors = this.factors.length; // ?
        this.playerPicked = null;
    }
    PotNums.prototype.pick = function () {
        this.playerPicked = true;
        this.cell.addClass("picked");
    };
    PotNums.prototype.tax = function () {
        this.playerPicked = false;
        this.cell.addClass("taxed");
        // currently no need to recurse down through factors
    };
    return PotNums;
}());
function getDivs(n) {
    var rtn = [1];
    for (var i = 2; i <= Math.sqrt(n); i++) {
        if (n % i == 0) {
            rtn.push(i);
        }
    }
    return rtn;
}
$("#button").on({
    click: function () {
        console.log("running enter...");
        var potSize = Number($("#taxman-size").val());
        console.log("pot size: " + potSize);
        var p = new Pot(potSize);
        var rowWidth = 10; // ehh
        console.log("pot made :), first entry:");
        console.log(p.nums[0]);
        // NEED TO REMEMBER TO CLEAR TABLE
        var numFullRows = Math.round(potSize / 10 - 1); // not sure the round is needed
        var cells = p.nums.map(function (n) {
            return n.cell;
        });
        for (var i = 0; i <= numFullRows; i++) {
            var row = $("<tr></tr>");
            for (var j = 0; j < rowWidth; j++) {
                var curr = i * 10 + j;
                if (curr >= potSize) {
                    break;
                }
                var cell = $("<td></td>")
                    .text(curr)
                    .attr("id", "n" + curr);
                row.append(cell);
            }
            $("tbody").append(row);
        }
        // might need to set n=1 to be unavailable?
        $("td").on({
            // is text() really the best thing to pull?
            click: function () {
                p.pick(Number($(_this).text()));
            },
            mouseenter: function () {
                console.log($(_this));
                var cellnum = Number($(_this).text());
                console.log("hovering over " + cellnum);
                var t = p.nums[cellnum - 1];
                if (t.availableFactors > 0) {
                    t.cell.css("background-color", "green"); // do this with css onhover?
                    $("td")
                        .filter(function () {
                        var facnum = Number($(_this).text());
                        return (t.factors.includes(facnum) &&
                            p.nums[facnum - 1].playerPicked == null);
                    })
                        .addClass("hovered");
                }
            },
            mouseleave: function () {
                var cellnum = Number($(_this).text());
                var t = p.nums[cellnum - 1];
                if (t.availableFactors > 0) {
                    t.cell.css("background-color", "green"); // do this with css onhover?
                    $("td").removeClass("hovered");
                }
            }
        });
    }
});
