package main

import "fmt"

func fakeContains(e int, l []int) bool {
	for n := range l {
		if (e == n) {
			return true
		}
	}
	return false
}

func fakeRemove(l []int, num int) []int { // WHY
	if (!fakeContains(num, l)) {
		print("no remove needed\n")
		return l
	}
	rtn := make([]int, len(l) - 1)
	i := 0
	for _, el := range l {
		fmt.Printf("checking %d\n", el)
		if (el != num) {
			fmt.Printf("%d ain't %d, adding to list\n", el, num)
			rtn[i] = el
			i++
			fmt.Printf("list now %v", rtn)
		}
	}
	return rtn
}


func main() {
	testlist := make([]int, 3)
	testlist[0] = 1
	testlist[1] = 2
	testlist[2] = 3

	fmt.Printf("before %v\n", testlist)

	testlist = fakeRemove(testlist, 2)

	fmt.Printf("after %v\n", testlist)
}