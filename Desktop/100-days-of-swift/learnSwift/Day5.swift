//
//  Day5.swift
//  learnSwift
//
//  Created by Isaac Atif on 8/15/19.
//  Copyright © 2019 Isaac Atif. All rights reserved.
//



func readName() {
    while true {
        print("Your name is...")
        break
    }
}

func countMultiplesOf10(numbers: [Int]) -> Int {
    var result = 0
    for number in numbers {
        if number % 10 == 0 {
            result += 1
        }
    }
    return result
}
countMultiplesOf10(numbers: [5, 10, 15, 20, 25])


//// enum SwimmingError: Error {
//case cantSwim
//}
//func swim(distance: Int) {
//    throw SwimmingError.cantSwim
//}
//
//Oops – that's not correct. The swim() function can't throw errors because it isn't marked with throws.
//
//


//func isUserAllowed(name username: String) -> Bool {
//    if name == "Anonymous" {
//        print("Forbidden")
//    } else {
//        print("Allowed")
//    }
//}
//
//Oops – that's not correct. This code has a couple of problems, not least that the isUserAllowed() function says it will return a Boolean, but it does not return anything.
//


//func paintWalls(tastefully: Bool, color: inout String) {
//    if tastefully {
//        color = "cream"
//    } else {
//        color = "tartan"
//    }
//}
//let color = ""
//paintWalls(tastefully: true, color: &color)
//
//Correct! This attempts to pass a constant string into a function as an inout parameter.
