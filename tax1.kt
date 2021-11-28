
data class Scores(val taxScore:Int, val playerScore:Int)

class GameState(val size: Int) {
    var available:MutableSet<Int> = (2..size).asSequence().toMutableSet<Int>()
    var unavailable:MutableSet<Int> = mutableSetOf(1)
    var taxman:MutableSet<Int> = mutableSetOf()
    var player:MutableSet<Int> = mutableSetOf()

    fun pick(num: Int) {
        val factors = findFactors(num) 
        available.remove(num)
        player.add(num)

        for (f in factors) {
            if (available.contains(f)) {
                available.remove(f)
                taxman.add(f)
            } else if (unavailable.contains(f)) {
                unavailable.remove(f)
                taxman.add(f)
            }
        }
        findUnfactorable(available) 
        
    } 

    fun endGame():Scores {
        taxman = taxman.union(unavailable).toMutableSet()
        return Scores(taxman.sum(), player.sum())
    }

    // make internal? 
    fun findFactors(num: Int): MutableSet<Int> { // TEST
        var factorsList = mutableSetOf(1)
        for (n in 2..(num/2)) {
            if (n % num == 0) {
                factorsList.add(n)
            }
        }
        return factorsList
    }

    fun findUnfactorable(s: MutableSet<Int>) { // I guess this is in place
        var newAvailable:MutableList<Int> = mutableListOf<Int>()
        var newUnavailable:MutableList<Int> = mutableListOf<Int>()
        for (num in s) {
            var factors = findFactors(num)

            if (s.intersect(factors).isNotEmpty()) {
                newAvailable.add(num)
            } else {
                newUnavailable.add(num)
            }
        }

        available.removeAll(newUnavailable)
        unavailable.addAll(newUnavailable)
    }
}


fun main() {
    print("Welcome to Taxman! How many numbers would you like to play with?")

    // get input num
    val num = readLine()?.toIntOrNull()
    if (num == null) {
        print("Nope! That's either nothing or not a valid number. Try again next time!")
        return
    }

    // check it's int
    val game = GameState(num)

    while (game.available.size > 0) {
        println(game.available)
        println("What number would you like to pick?")

        val picked = readLine()?.toIntOrNull()
        if (picked == null) {
            println("That wasn't a number! Please try again.")
            continue
        }
        if (game.available.contains(picked)) {
            println("That's not in the available list! Please try again.")
            continue
        }
        game.pick(picked) 
    }

    println("Game over!")
    val finalScores:Scores = game.endGame()

    println("The taxman took ${game.taxman}")
    println("You took $game.player")
    println("Final scores: Taxman -- ${finalScores.taxScore}, You -- ${finalScores.playerScore}")



}