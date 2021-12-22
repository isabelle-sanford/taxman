#!/bin/bash
./rands 10 | ./hqs > myfile
for ((n=1;n<8;n++))
    do
    for((m=0;m<30;m++))
        do
            ./rands 10**$n | ./hqs >> myfile
        
        done
    done