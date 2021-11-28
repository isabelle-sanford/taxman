
class GameState(val size: Int) {
    var available:MutableSet = mutableSetOf(2..size)
    var unavailable:MutableSet = mutableSetOf(1)
    var taxman:MutableSet = mutableSetOf()
    var player:MutableSet = mutableSetOf()

    fun pick(val num: Int) {
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
        available, unavailable = findUnfactorable(available) // TODO
        
    } 

    fun end():Int, Int {
        taxman = taxman.union(unavailable)
        return taxman.sum(), player.sum()
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

    fun findUnfactorable(s: MutableSet<Int>): MutableSet<Int>, MutableSet<Int> {
        var newAvailable:MutableSet = mutableSetOf<Int>()
        var newUnavailable:MutableSet = mutableSetOf<Int>()
        for (num in s) {
            var factors = findFactors(num)

            if (s.intersect(factors).isNotEmpty()) {
                newAvailable.add(num)
            } else {
                newUnavailable.add(num)
            }
        }

        return newAvailable, newUnavailable
    }
}


fun main() {
    print("Welcome to Taxman! How many numbers would you like to play with?")

    // get input num
    val num = readLine().toIntOrNull()
    if (num == null) {
        print("Nope! That's either nothing or not a valid number. Try again next time!")
        return
    }

    // check it's int
    val game = GameState(num)

    while (game.available.size > 0) {
        println(game.available)
        println("What number would you like to pick?")

        val picked = readLine().toIntOrNull()
        if (picked == null) {
            println("That wasn't a number! Please try again.")
            continue
        }
        if (game.available.contains(picked)) {
            println("That's not in the available list! Please try again.")
            continue
        }
        game.pick(picked) // TODO
    }

    println("Game over!")
    println(game.end()) // TODO

    println("The taxman took {game.taxman}")
    println("You took {game.player}")
    println("Final scores: Taxman -- {game.taxman_score}, You -- {game.player_score}")



}