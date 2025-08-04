import { odds } from "./odds";
import { IOracle } from "./oracle.model";
import { oracleType } from "./oracle.model";

export const oracles: IOracle[] = [
    // {
    //     title: "Yes/No",
    //     type: oracleType.yesNo,
    //     table: [
    //         // Row One
    //         [
    //             {
    //                 // Entry Zero (prior to roll)
    //                 textOne: 'Think of a question',
    //                 textTwo: "Select the likelihood",
    //                 textThree: "Tap here to roll"
    //             },
    //             {
    //                 // Entry One
    //                 textOne: 'No, and...',
    //                 textTwo: "You fail, and something makes it worse",
    //                 textThree: "A major failure that escalates the stakes"
    //             },
    //             {
    //                 // Entry Two
    //                 textOne: 'No',
    //                 textTwo: "You fail",
    //                 textThree: "A moderate failure that brings the scene to a halt or obstacle"
    //             },
    //             {
    //                 // Entry Three
    //                 textOne: 'No, but...',
    //                 textTwo: "You fail, but something useful happens",
    //                 textThree: "A failure with compensation or a shift in direction"
    //             },
    //             {
    //                 // Entry Four
    //                 textOne: 'No',
    //                 textTwo: "You fail",
    //                 textThree: "A moderate failure that brings the scene to a halt or obstacle"
    //             },
    //             {
    //                 // Entry Five
    //                 textOne: 'Yes, but…',
    //                 textTwo: "You succeed, but at a cost",
    //                 textThree: "A success with consequences that slow your progress"
    //             },
    //             {
    //                 // Entry Four
    //                 textOne: 'Yes, and…',
    //                 textTwo: "You succeed and gain something extra",
    //                 textThree: "A major success that drives the story forward boldly"
    //             },
    //         ],
    //         // Row Two
    //         [

    //         ]
    //     ],
    //     rollCaps: {
    //         rollOneMax: 6, // Regular roll cap
    //         rollTwoMax: 6, // dis/advantage roll cap
    //         rollThreeMax: 4, // twist roll cap
    //         rollFourMax: 6, // twist subject roll cap
    //         rollFiveMax: 6, // twist verb roll cap
    //         rollSixMax: 0,
    //         rollSevenMax: 0,
    //     },
    //     useLikely: true,
    //     howLikely: odds.average,
    // },
    {
        title: "Yes/No",
        type: oracleType.yesNo,
        table: [
            // Row One
            [
                [
                    // Entry Zero - only displayed during intro
                    "Think of a 'Yes/No' question",
                    "Evaluate the likelihood",
                    "Tap here to roll"
                ],
                [
                    // Entry One
                    'No, and...',
                    "You fail, and something makes it worse",
                    "A major failure that escalates the stakes"
                ],
                [
                    // Entry Two
                    'No',
                    "You fail",
                    "A moderate failure that brings the scene to a halt or obstacle"
                ],
                [
                    // Entry Three
                    'No, but...',
                    "You fail, but something useful happens",
                    "A failure with compensation or a shift in direction"
                ],
                [
                    // Entry Four
                    'Yes, but...',
                    "You succeed, but at a cost",
                    "A success with consequences that slow your progress"
                ],
                [
                    // Entry Five
                    'Yes',
                    "You succeed",
                    "A moderate success that moves the story forward as expected"
                ],
                [
                    // Entry Six
                    'Yes, and…',
                    "You succeed and gain something extra",
                    "A major success that drives the story forward boldly"
                ],
            ],
            // Row Two
            [
                [
                    // Entry Zero - never displayed
                    ''
                ],
                [
                    // Entry One - Twist Die Subjects
                    'A new NPC'
                ],
                [
                    // Entry Two - Twist Die Subjects
                    'An existing NPC'
                ],
                [
                    // Entry Three - Twist Die Subjects
                    'A group or faction'
                ],
                [
                    // Entry Four - Twist Die Subjects
                    'A physical event'
                ],
                [
                    // Entry Five - Twist Die Subjects
                    'An emotional shift'
                ],
                [
                    // Entry Six - Twist Die Subjects
                    'An object or clue'
                ],
            ],
            // Row Three
            [
                [
                    // Entry Zero - never displayed
                    '',
                ],
                [
                    // Entry One - Twist Die Actions
                    'interferes', 'appears'
                ],
                [
                    // Entry Two - Twist Die Actions
                    'alters the location', 'alters the location'
                ],
                [
                    // Entry Three - Twist Die Actions
                    'hinders you', 'helps you'
                ],
                [
                    // Entry Four - Twist Die Actions
                    'creates an obstacle', 'removes an obstacle'
                ],
                [
                    // Entry Five - Twist Die Actions
                    'changes the motive/goal', 'changes the motive/goal'
                ],
                [
                    // Entry Six - Twist Die Actions
                    'disrupts the plot', 'advances the plot'
                ],
            ]

        ],
        rollCaps: {
            rollOneMax: 6, // Primary
            rollTwoMax: 6, // Secondary
            rollThreeMax: 4, // Twist die
            rollFourMax: 6, // Subject
            rollFiveMax: 6, // Action
            rollSixMax: 0,
            rollSevenMax: 0,
        },
    }
]