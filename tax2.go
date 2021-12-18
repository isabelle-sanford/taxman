package main

import (
	"strconv"
	"os"
	"fmt"
)

// TODO
// change printf to Fmt.printf

type Scores struct {
	taxScore int
	playerScore int
}

func (s Scores) String() string {
	return fmt.Sprintf("Taxman: %d    Player: %d\n", s.taxScore, s.playerScore)
}

func fakeContains(e int, l []int) bool {
	for _, n := range l {
		if (e == n) {
			return true
		}
	}
	return false
}
func fakeRange(min int, max int) []int {
	rtn := make([]int, max - min + 1)

	for i := 0; i <= max - min; i++ {
		rtn[i] = i + min
	}

	return rtn
}
func fakeSum(l []int) int {
	rtn := 0
	for _, el := range l {
		rtn += el
	}
	return rtn
}
func fakeIntersect(l1 []int, l2 []int) []int {
	rtn := make([]int, 0)

	for _, el1 := range l1 {
		for _, el2 := range l2 {
			if (el1 == el2) {
				rtn = append(rtn, el1)
				break
			}
		}
	}
	return rtn
}
func fakeRemove(l []int, num int) []int { // WHY
	if (!fakeContains(num, l)) {
		print("no remove needed\n")
		return l
	}
	rtn := make([]int, len(l) - 1)
	i := 0
	for _, el := range l {
		if (el != num) {
			rtn[i] = el
			i++
		}
	}
	return rtn
}

// any way to do a constructor/initialization?
// can structs have default args? 
type GameState struct {
	size int
	available []int
	unavailable []int
	taxman []int
	player []int
	score Scores
}
// could just do 1 pot list like ["U", "A", "A", ...] instead of four separate?
// would also be an array, which is nice

// can probs be more efficient
// maybe whenever you find a divisor also add its pair?
func getDivisors(num int) []int {
	factorsList := make([]int, 0) // add 1 at start? 

	for j := 1; j < num / 2 + 1; j++ {
		if (num % j == 0) {
			factorsList = append(factorsList, j) // is there really no inplace way here
		}
	}
	return factorsList
}

func (G GameState) findUnfactorable() GameState {
	for _, a := range G.available { // this is val not index right?
		currFactors := getDivisors(a)

		// intersect func would be great here
		av := false
		for _, f := range currFactors {
			if (fakeContains(f, G.available) || fakeContains(f, G.unavailable)) {
				av = true
				break // wait how do I do a goto break dammit
			}
		}
		if (!av) {
			G.available = fakeRemove(G.available, a) // inplace?? syntax?
			G.unavailable = append(G.unavailable, a)
		}
	}
	return G
}

func (G GameState) pick(num int) GameState {
	//fmt.Printf("Just inside pick, game is %v\n", G)
	factors := getDivisors(num)
	// inplace things :(((
	G.available = fakeRemove(G.available, num) // check whether num in available?
	//fmt.Printf("available is %v\n", G.available)
	G.player = append(G.player, num)

	//fmt.Printf("picked and removed %d, available is %v, player is %v\n", num, G.available, G.player)

	// score update
	G.score.playerScore += num

	for _, f := range factors {
		
		if (fakeContains(f, G.available)) { // maybe have "remove if there" func?
			// would be great to not have to do this twice
			G.taxman = append(G.taxman, f)
			G.score.taxScore += f

			G.available = fakeRemove(G.available, f)
		}
		if (fakeContains(f, G.unavailable)) {
			G.taxman = append(G.taxman, f)
			G.score.taxScore += f
			G.unavailable = fakeRemove(G.unavailable, f)
		}
	}

	G = G.findUnfactorable()

	return G // do I really have to...
}

func (G GameState) endGame() GameState {
	// check if game should actually end
	for _, n := range G.unavailable {
		G.score.taxScore += n
	}
	return G
}


func greedy(potsize int) {
	g := GameState{potsize, fakeRange(2, potsize), fakeRange(1,1), make([]int, 0), make([]int, 0), Scores{0,0}}

	// in the long run a running tally of player-taxman for each might be better

	// WHILE game not over {
	for i := 0; i < 400; i++ {
		bestscore := 0 // will there always be a maximization > 0? bc CAN be negative
		bestmax := 0
		for _, n := range g.available {
			nFactors := getDivisors(n)
			taxTake := fakeSum(fakeIntersect(nFactors, g.available)) + fakeSum(fakeIntersect(nFactors, g.unavailable)) //hmmmmmmm

			if (n - taxTake >= bestmax) { // has to be >= to pref higher number w same max score
				bestscore = n
				bestmax = n - taxTake
			}
		}

		g = g.pick(bestscore)
		//fmt.Printf(" %d ", bestscore)

		if (len(g.available) < 1) {
			//print ("d")
			break
		}
	}

		// fmt.Printf("\nState: %v\n", g)
	g = g.endGame()
	//fmt.Printf("\n%s", g.score.String())

	// TAX then PLAYER
	fmt.Printf("%3d %7d %7d\n", potsize, g.score.taxScore, g.score.playerScore)
}


	// ! re-copy above func once it's all WORKING
	// func improvedGreedy(potsize int) {
	// 	g := GameState{potsize, fakeRange(2, potsize), fakeRange(1,1), make([]int, 0), make([]int, 0), Scores{0,0}}

	// 	// in the long run a runing tally of player-taxman for each might be better

	// 	// ! WHILE game not over {
	// 		bestscore := 0 // will there always be a maximization > 0? bc CAN be negative
	// 		for n := range g.available {
	// 			nFactors := getDivisors(n)
	// 			taxTake := sum(nFactors.intersect(g.available)) + sum(nFactors.intersect(g.unavailable)) //hmmmmmmm

	// 			if (n - taxTake > bestscore) {
	// 				bestscore = n
	// 			}
	// 		}

	// 		bestFactors := getDivisors(bestscore)
	// 		for b := range bestFactors {
	// 			// ? check... ??? pick ???
	// 		}
	// 		g.pick(bestscore)
	// 		print(bestscore + " ")
		
	// 	printf("%s", g.score.String())
	// }

	//func perlmutter(potsize int)

	//func hensley(potsize int) // ...ehhhhhhhhh

	// cmd line run: go run tax2.go m OR go run tax2.go a > input.txt
	// (not sure if that should be > or <)
	// m = manual, a = automatic, g = greedy
	// maybe have required arg for pot size?


func main() {
	if (len(os.Args) == 1) { // check for more than 2? depends on how stdin works
		print("no arguments given \n")
		return
	}

	potsize, _ := strconv.Atoi(os.Args[2]) 
	myGame := GameState{potsize, fakeRange(2,potsize), fakeRange(1,1), make([]int, 0), make([]int, 0), Scores{0,0}} // nope nope nope

	if (os.Args[1] == "g") {
		greedy(potsize)
	}

	if (os.Args[1] == "m") {
		// how to do a fuckin while loop
		// WHILE len(game.available) > 0 {
			println("Pick a number: ")
			// ... how to read from stdin?
	}

	if (os.Args[1] == "a") {
		// how to read from stdin??
		for i := 3; i < len(os.Args); i++ { 
			picked, _ := strconv.Atoi(os.Args[i])
			if (!fakeContains(picked, myGame.available)) {
				fmt.Printf("next pick %d not in available, skipping\n", picked)
				continue
			}
			myGame.pick(picked)
			if (len(myGame.available) < 1) {
				break
				// PROBABLY PRINT MORE STUFF HERE
			}
		}
		fmt.Printf("Game over! Scores: %s", myGame.score.String())
	}
}


// questions:
// does go have sets? ??? or intersect thing? 