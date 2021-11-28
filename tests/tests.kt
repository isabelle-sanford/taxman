
fun findFactors(num: Int): MutableSet<Int> { // TEST
    var factorsList = mutableSetOf(1)
    for (n in 1..(num/2 + 1)) {
        //println("Checking $n...")
        if (num % n == 0) {
            //println("Adding $n to factors list...")
            factorsList.add(n)
        }
    }
    
    return factorsList
}

fun findUnfactorable(s: MutableSet<Int>) { // I guess this is in place
    var newAvailable:MutableList<Int> = mutableListOf<Int>()
    var newUnavailable:MutableList<Int> = mutableListOf<Int>()
    for (num in s) {
        println("Checking $num...")
        var factors = findFactors(num)
        println("Factors found: $factors")

        if (s.intersect(factors).isNotEmpty()) {
            println("Adding to available...")
            newAvailable.add(num)
        } else {
            println("Adding to unavailable...")
            newUnavailable.add(num)
        }
    }

    println("Now available: $newAvailable")
    println("Now unavailable: $newUnavailable")
}

fun main() {

    //println(findFactors(4))

    

    val set1 = mutableSetOf(2,3,4,7,8,9,10)

    findUnfactorable(set1)
    
}