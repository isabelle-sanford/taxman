#!/bin/bash
# part 2 of q5
for val in {1..100}
do
    go run tax2.go g $val >> greedy.txt
done