//
//  main.swift
//  learnSwift
//
//  Created by Isaac Atif on 8/14/19.
//  Copyright © 2019 Isaac Atif. All rights reserved.
//

import Foundation

func run () {
    
    let arguments = CommandLine.arguments
    
    if arguments.count > 1 {
        
        let greeting = arguments[1]
        
        print(greeting)
        
    }
    
    if arguments.count > 2 {
        
        let number = arguments[2]
        
        print(number)
        
    }
    
    print("Hello, World! This is my command line tool")
    
}

run()

readName()
