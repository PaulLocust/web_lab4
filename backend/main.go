package main

import "fmt"

func main() {
	s := []int{7, 2, 8, -9, 4, 0}
	fmt.Println(s[:len(s)/2])
}
