class Pot {
  size: number;
  nums: PotNums[];
  playerScore: number;
  taxScore: number;

  constructor(potsize: number) {
    this.size = potsize;
    this.playerScore = 0;
    this.taxScore = 0;

    this.nums = []; // unnecessary?

    // this could have better variables
    for (let i = 1; i <= potsize; i++) {
      let cell = $("<td></td>")
        .text(i)
        .addClass("available")
        .addClass("potNum")
        .attr("id", "n" + i); // necessary?

      // calculate multiples
      let multiplesList: number[] = [];
      for (let j = i * 2; j < potsize; j += i) {
        multiplesList.push(j);
      }

      this.nums.push(new PotNums(i, cell, multiplesList));
    }
  }

  pick(n: number) {
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
      if (--this.nums[i - 1].availableFactors < 1) {
        // need to check whether picked or no?
        this.nums[i - 1].cell.addClass("unavailable").removeClass("available");
      } // can this go below 0?
    }
    for (let j of curr.factors) {
      this.tax(this.nums[j - 1].val);
    }
  }

  tax(n: number) {
    // maybe just pass in potnum? internal func anyway
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
      if (
        --this.nums[i - 1].availableFactors < 1 &&
        this.nums[i - 1].playerPicked == null
      ) {
        this.nums[i - 1].cell.addClass("unavailable").removeClass("available");
      }
    }
  }

  endGame() {
    // not super efficient and not sure it's all there?
    for (let j of this.nums) {
      if (j.playerPicked == null) {
        this.taxScore += j.val;
        j.tax();
      }
    }
  }
}

class PotNums {
  // constants
  val: number;
  cell: any; // maybe figure out actual type
  factors: number[];
  multiples: number[];

  // changeable
  availableFactors: number;
  playerPicked: boolean | null;

  constructor(myVal: number, myCell: any, multiplesList: number[]) {
    this.val = myVal;
    this.cell = myCell;
    this.factors = getDivs(myVal);
    this.multiples = multiplesList;

    this.availableFactors = this.factors.length; // ?
    this.playerPicked = null;
  }

  pick(): void {
    this.playerPicked = true;
    this.cell
      .addClass("picked")
      .removeClass("available")
      .removeClass("unavailable");
  }

  tax(): void {
    this.availableFactors = 0; // not necessary?
    this.playerPicked = false;
    this.cell.addClass("taxed").removeClass("available unavailable");
    // currently no need to recurse down through factors
  }
}

function getDivs(n: number): number[] {
  let rtn = [1];

  for (let i = 2; i <= Math.sqrt(n); i++) {
    if (n % i == 0) {
      rtn.push(i);
      if (n / i != i) {
        rtn.push(n / i);
      }
    }
  }

  return rtn;
}

$("#button").on("click", runEnter);
$("input").on("change", runEnter);

function runEnter() {
  $("#pot").html("");
  $("#win").text("");
  let potSize = Number($("#pot-size").val()); // catch non-num error
  console.log("pot size: " + potSize);

  let p = new Pot(potSize);
  console.log(p);

  let rowWidth = 10; // ehh

  let numRows = Math.round(potSize / 10); // not sure the round is needed
  let cells: any[] = p.nums.map(function (n) {
    return n.cell;
  });

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
    $("#pot").append(row);
  }

  // ?might need to set n=1 to be unavailable?

  let playing = true;

  $(".potNum").on({
    // is text() really the best thing to pull?
    mouseenter: function () {
      let cellnum = Number($(this).text());
      // console.log("hovering over " + cellnum);
      let t: PotNums = p.nums[cellnum - 1];
      if (t.availableFactors > 0) {
        //t.cell.css("background-color", "green"); // do this with css onhover?

        $(".potNum")
          .filter(function () {
            let facnum = Number($(this).text());
            return (
              t.factors.includes(facnum) &&
              p.nums[facnum - 1].playerPicked == null
            );
          })
          .addClass("hovered");
      }
    },
    mouseleave: function () {
      let cellnum = Number($(this).text());
      let t = p.nums[cellnum - 1];

      // if statement checking for not-yet-picked?
      //t.cell.css("background-color", "white"); // do this with css onhover?
      $(".potNum").removeClass("hovered");
    },
    click: function () {
      p.pick(Number($(this).text()));
      console.log(p);
      $("#playerscore").text(p.playerScore);
      $("#taxmanscore").text(p.taxScore);

      if (!$(".potNum").hasClass("available")) {
        p.endGame();
        if (p.playerScore > p.taxScore) {
          $("#win").text("YOU WON!!!!");
        } else {
          $("#win").text("YOU LOST!!!!");
        }
        // add tie condition
      }
    },
  });
}
