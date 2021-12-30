#!/bin/bash
# part 2 of q5
for val in {1..1000}
do
    echo $val
    go run tax2.go g $val >> greedy0.txt
done
echo "DONE"