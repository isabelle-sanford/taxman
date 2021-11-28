
class GameState(val size: Int) {
    var available:MutableSet = mutableSetOf(2..size)
    var unavailable:MutableSet = mutableSetOf(1)
    var taxman:MutableSet = mutableSetOf()
}


fun main() {
    print("Welcome to Taxman! How many numbers would you like to play with?")

    // get input num
    val num = readLine()
    if (num.toIntOrNull() == null) {
        print("Nope! That's either nothing or not a valid number. Try again next time!")
        return
    }

    // check it's int
    val game = GameState(num)

    while (game.available.size > 0) {
        println(game.available)
        println("What number would you like to pick?")

        val picked = readLine()
        if (picked.toIntOrNull() == null) {
            println("That wasn't a number! Please try again.")
            continue
        }
        if (picked not in game.available) {
            println("That's not in the available list! Please try again.")
            continue
        }
        game.pick(picked)
    }

    println("Game over!")
    println(game.end())

    println("The taxman took {game.taxman}")
    println("You took {game.player}")
    println("Final scores: Taxman -- {game.taxman_score}, You -- {game.player_score}")



}