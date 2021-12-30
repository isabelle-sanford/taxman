// interface or class?
class Pot {
  size: number;
  nums: PotNums[];
  playerScore: number;
  taxScore: number;

  constructor(n: number) {
    console.log("making the pot...");
    this.size = n;
    this.playerScore = 0;
    this.taxScore = 0;

    this.nums = []; // unnecessary?

    // this could have better variables
    for (let i = 1; i <= n; i++) {
      //console.log("making num " + i);
      let cell = $("<td></td>")
        .text(i)
        .attr("id", "n" + i);

      // calculate multiples
      let m: number[] = [];
      for (let j = i * 2; j < n; j += i) {
        m.push(j);
      }

      this.nums.push(new PotNums(i, cell, m));
    }
    console.log("nums made!");
  }

  pick(n: number) {
    if (n > this.size) {
      return null;
    }

    let curr = this.nums[n - 1];

    // probably don't need both clauses here
    if (curr.availableFactors < 1 || curr.playerPicked != null) {
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
        k.cell.addClass("unavailable");
      }
    }
  }

  tax(n: number) {
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
  // constant(?)
  val: number;
  cell: any; // maybe figure out actual type
  factors: number[];
  multiples: number[];

  // changeable
  availableFactors: number;
  playerPicked: boolean | null;

  constructor(v: number, c: any, m: number[]) {
    // might need potsize (for multiples)
    this.val = v;
    this.cell = c;
    this.factors = getDivs(v);
    this.multiples = m;

    this.availableFactors = this.factors.length; // ?
    this.playerPicked = null;
  }

  pick(): void {
    this.playerPicked = true;
    this.cell.addClass("picked");
  }

  tax(): void {
    this.playerPicked = false;
    this.cell.addClass("taxed");
    // currently no need to recurse down through factors
  }
}

function getDivs(n: number): number[] {
  let rtn = [1];

  for (let i = 2; i <= Math.sqrt(n); i++) {
    if (n % i == 0) {
      rtn.push(i);
    }
  }

  return rtn;
}

$("#button").on({
  click: () => {
    console.log("running enter...");
    let potSize = Number($("#taxman-size").val());
    console.log("pot size: " + potSize);

    let p = new Pot(potSize);
    let rowWidth = 10; // ehh

    console.log("pot made :), first entry:");
    console.log(p.nums[0]);

    // NEED TO REMEMBER TO CLEAR TABLE

    let numFullRows = Math.round(potSize / 10 - 1); // not sure the round is needed
    let cells: any[] = p.nums.map(function (n) {
      return n.cell;
    });
    for (let i = 0; i <= numFullRows; i++) {
      let row = $("<tr></tr>");

      for (let j = 0; j < rowWidth; j++) {
        let curr = i * 10 + j;
        if (curr >= potSize) {
          break;
        }
        row.append(cells[curr]);
      }
      $("tbody").append(row);
    }
    // might need to set n=1 to be unavailable?

    $("td").on({
      // is text() really the best thing to pull?
      click: () => {
        p.pick(Number($(this).text()));
      }, // arrow syntax?
      mouseenter: () => {
        console.log($(this));
        let cellnum = Number($(this).text());
        console.log("hovering over " + cellnum);
        let t: PotNums = p.nums[cellnum - 1];
        if (t.availableFactors > 0) {
          t.cell.css("background-color", "green"); // do this with css onhover?

          $("td")
            .filter(() => {
              let facnum = Number($(this).text());
              return (
                t.factors.includes(facnum) &&
                p.nums[facnum - 1].playerPicked == null
              );
            })
            .addClass("hovered");
        }
      },
      mouseleave: () => {
        let cellnum = Number($(this).text());
        let t = p.nums[cellnum - 1];
        if (t.availableFactors > 0) {
          t.cell.css("background-color", "green"); // do this with css onhover?
          $("td").removeClass("hovered");
        }
      },
    });
  },
});
