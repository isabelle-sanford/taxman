

let myPot: PotNums[];
let playerScore: number = 0;
let taxScore: number = 0;

// interface or class?
class Pot {
    size: number;
    nums: PotNums[];
    playerScore: number;
    taxScore: number;

    constructor(n: number) {
        this.size = n;
        this.playerScore = 0;
        this.taxScore = 0;

        let nums = PotNums[];

        for (let i = 0; i < n; i++) {
            let cell = $("<td></td>").text(i).attr("id", "n" + i);

            this.nums.push(new PotNums(i, cell))
        }
    }

    pick(n: number) {
        if (n > this.size) {return null}

        let curr = this.nums[n-1];

        // probably don't need both clauses here
        if (curr.availableFactors < 1 || curr.playerPicked != null) { return null }
    
        curr.pick();

        this.playerScore += n;
        // !increment taxScore
        // (maybe have curr.pick() return taxman sum?)
    }

    tax(n: number) {
        if (n > this.size) {return null}
        let curr = this.nums[n-1];
        if (curr.playerPicked != null) { return null }

        this.taxScore += n;
        curr.tax();

        for (let i of curr.multiples) {
            this.nums[i-1].availableFactors--;
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
    picked: boolean; // unnecessary?
    playerPicked: boolean | null;

    constructor(v: number, c: any) { // might need potsize (for multiples)
        this.val = v;
        this.cell = c;

        // !calculate factors & multiples
        
        this.picked = false;
        this.playerPicked = null;
    }

    pick(): void {
        this.picked = true;
        this.playerPicked = true;

        // update cell properties
        this.cell.addClass("picked");
        

        for (let i of this.multiples) {
            myPot[i-1].availableFactors--; // can this go below 0?
        }

        for (let j of this.factors) {
            myPot[j].tax(); 
        }

        // increment player score?

        // check + mark new unpickables (alternatively do this when decrementing hits 0)
        for (let k of myPot) {
            if (k.availableFactors < 1) {
                // ! update cell properties
            }
        }
    }

    tax(): void {
        this.picked = true;
        this.playerPicked = false;
        
        // update cell properties
        this.cell.addClass("taxed");

        // currently no need to recurse down through factors

    }

}


interface pots2 {
  val: number;
  cell: any;
  factors: number[];
  multiples: number[];
  availableFactors: number; // score, initially equivalent to len(factors), unavailable when 0
  picked: boolean; // maybe unnecessary?
  playerPicked: boolean | null; // true if player picked, false if taxed, null if unpicked
}

// Statuses: not picked, has factors remaining (available)
// not picked, no unpicked factors (unavailable)
// picked, by player
// picked, by taxman
// could just do numerical 1-4?

interface PotNumber {
  // maybe make class instead?
  val: number;
  available: boolean; // ie has divs left
  cell: any;
  divs: number[];
  picked: boolean;
  taxman?: boolean;
  player?: boolean;
}

let scores = { taxman: 0, player: 0 };

let pot: PotNumber[] = [];

function getDivs(n: number): number[] {
  let rtn = [1];

  for (let i = 2; i <= n / 2; i++) {
    if (n % i == 0) {
      rtn.push(i);
    }
  }

  return rtn;
}

function pickNum(n: number): void {
  let picked = pot[n - 1];

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
  for (let i of picked.divs) {
    let thisDiv = pot[i - 1];
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

  let potSize = Number($("#taxman-size").val()); // convert to num?

  console.log(potSize);

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

      pot.push({
        val: num,
        available: true,
        cell: cell,
        divs: getDivs(num),
        picked: false,
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
      let t = pot[Number($(this).text()) - 1];
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
      let t = pot[Number($(this).text()) - 1];
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
    },
  });
  //console.log(pot);
});
