import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Oracle } from './oracle';
import { provideZonelessChangeDetection } from '@angular/core';
import { OraclePinService } from '../../data/oracle.service';
import { IOracle, oracleType } from '../../data/oracle.model';
import { storageToken, testLocation } from '../../data/library';

describe('Oracle', () => {
  let component: Oracle;
  let fixture: ComponentFixture<Oracle>;
  let mockService;
  const testOracles: IOracle[] = [
    {
      iID: 0,
      title: "Yes/No",
      defaultPosition: 0,
      currentPosition: 0,
      type: oracleType.yesNo,
      pinned: false,
      table: [
        // Row Zero
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
        // Row One
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
        // Row Two
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
    },
    {
      iID: 1,
      title: "Magnitude",
      type: oracleType.singleroll,
      defaultPosition: 1,
      currentPosition: 0,
      pinned: false,
      table: [
        // Row Zero
        [
          [
            // Entry Zero - only displayed during intro
            "Big, Good, Strong, Numerous",
            "What magnitude do you expect?",
            "Tap here to roll"
          ],
          [
            // Entry One
            'Surprisingly lacking',
            "",
            "Actually, why is it so low?"
          ],
          [
            // Entry Two
            'Less than expected',
            "",
            "Congrats, or I'm sorry"
          ],
          [
            // Entry Three
            'About average',
            "",
            "Your intuition was correct"
          ],
          [
            // Entry Four
            'About average',
            "",
            "Your intuition was correct"
          ],
          [
            // Entry Five
            'More than expected',
            "",
            "Sorry about that, or congratulations"
          ],
          [
            // Entry Six
            'Extraordinary',
            "",
            "That's .... many"
          ],
        ],

      ],
      rollCaps: {
        rollOneMax: 6, // Primary
        rollTwoMax: 6, // Secondary
        rollThreeMax: 0, // Twist die
        rollFourMax: 0, // Subject
        rollFiveMax: 0, // Action
        rollSixMax: 0,
        rollSevenMax: 0,
      },
    },
    {
      iID: 2,
      title: "Inspiration",
      type: oracleType.multiroll,
      defaultPosition: 2,
      currentPosition: 0,
      pinned: true,
      table: [
        // Row Zero
        [
          [
            // Entry Zero - only displayed during intro
            "Interpretation/Inspiration",
            "What's at stake, or how does the story shift?",
            "Tap here to roll"
          ],
        ],
        // Row One - Verb Table
        [
          [
            // Entry Zero - never displayed
            ''
          ],
          [
            // Entry One
            '', 'seek', 'oppose', 'deceive', 'study', 'ask', 'continue'
          ],
          [
            // Entry Two
            '', 'communicate', 'move', 'replace', 'share', 'play', 'balance'
          ],
          [
            // Entry Three
            '', 'harm', 'create', 'expand', 'desire', 'possess', 'overlook',
          ],
          [
            // Entry Four
            '', 'reveal', 'command', 'explore', 'borrow', 'receive', 'multiply'
          ],
          [
            // Entry Five
            '', 'take', 'challenge', 'damage', 'collect', 'improve', 'follow'
          ],
          [
            // Entry Six
            '', 'assist', 'transform', 'uncover', 'control', 'block', 'reduce'
          ],
        ],
        // Row Two - Noun Table
        [
          [
            // Entry Zero - never displayed
            '',
          ],
          [
            // Entry One
            '', 'need', 'allies', 'result', 'shift', 'threat', 'home'
          ],
          [
            // Entry Two
            '', 'community', 'history', 'offer', 'outcast', 'conflict', 'gift'
          ],
          [
            // Entry Three
            '', 'plans', 'enemies', 'beginning', 'memory', 'chance', 'group'
          ],
          [
            // Entry Four
            '', 'knowledge', 'rumors', 'discovery', 'disguise', 'signal', 'name'
          ],
          [
            // Entry Five
            '', 'plot', 'event', 'spy', 'loss', 'path', 'map'
          ],
          [
            // Entry Six
            '', 'equipment', 'faction', 'place', 'object', 'harm', 'respect'
          ],
        ],
        // Row Three - Adjective Table
        [
          [
            // Entry Zero - never displayed
            '',
          ],
          [
            // Entry One
            '', 'small', 'large', 'unique', 'faulty', 'sophisticated', 'tricky'
          ],
          [
            // Entry Two
            '', 'old', 'new', 'broken', 'wealthy', 'quiet', 'magnificent'
          ],
          [
            // Entry Three
            '', 'ordinary', 'simple', 'unhealthy', 'scarce', 'enduring', 'harsh'
          ],
          [
            // Entry Four
            '', 'clean', 'unsavory', 'surprising', 'rare', 'weak', 'amusing'
          ],
          [
            // Entry Five
            '', 'slow', 'perfect', 'defiant', 'generous', 'busy', 'happy'
          ],
          [
            // Entry Six
            '', 'exotic', 'dignified', 'violent', 'rough', 'noisy', 'scary'
          ],
        ]

      ],
      rollCaps: {
        rollOneMax: 6, // All rolls for this oracle are capped at 6
        rollTwoMax: 0,
        rollThreeMax: 0,
        rollFourMax: 0,
        rollFiveMax: 0,
        rollSixMax: 0,
        rollSevenMax: 0,
      },
    },
  ]

  beforeEach(async () => {
    mockService = jasmine.createSpyObj('OraclePinService', ['pin', 'moveUp', 'moveDown'])

    await TestBed.configureTestingModule({
      imports: [Oracle],
      providers: [
        provideZonelessChangeDetection(),
        { provide: storageToken, useValue: testLocation },
        { provide: OraclePinService, useValue: mockService }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(Oracle);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('oracle', testOracles[2]);
    fixture.detectChanges();
  });

  it('should create an Oracle component', () => {
    expect(component).toBeTruthy();
  });

  it(`should generate an integer between maxRoll and 1 (inclusive) that does not match the current roll`, () => {

    const shouldBeOne = component.generateRoll(1, 0)
    expect(shouldBeOne).toEqual(1)

    const cannotBeTwo = component.generateRoll(2, 2)
    expect(cannotBeTwo).toEqual(1)

    const shouldBeZero = component.generateRoll(0, 0)
    expect(shouldBeZero).toEqual(0)

    const lessThanTen = component.generateRoll(10, 0)
    expect(lessThanTen).toBeLessThanOrEqual(10)
  })

});
