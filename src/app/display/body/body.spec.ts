import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Body } from './body';
import { provideZonelessChangeDetection } from '@angular/core';
import { OraclePinService } from '../../data/oracle.service';
import { BehaviorSubject, of } from 'rxjs';
import { IOracle, oracleType } from '../../data/oracle.model';
import { storageToken, testLocation } from '../../data/library';
import { ActivatedRoute, convertToParamMap, ParamMap, provideRouter, UrlSegment } from '@angular/router';
import { ROUTER_TOKENS } from '../../app.routes.constant';
import { provideLocationMocks } from '@angular/common/testing';
import { By } from '@angular/platform-browser';

describe('Body', () => {
  let component: Body;
  let fixture: ComponentFixture<Body>;
  let mockOracleService;
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
      tags: [],
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
      tags: [],
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
      tags: [],
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
    {
      iID: 3,
      title: "Cascading",
      type: oracleType.cascading,
      defaultPosition: 3,
      currentPosition: 3,
      pinned: false,
      table: [
        // Row Zero
        [
          [
            // Entry Zero - only displayed during intro
            "Attempt task with a 'Yes/No' question",
            "Ask a skill-based question",
            "Evaluate the likelihood",
          ],
          [
            // Entry One
            'No',
            "You fail, possibly due to lack of skill",
            "It may be impossible/not exist"
          ],
          [
            // Entry Two
            'Yes',
            "You succeed",
            "Proceed to ask a world/narrative-based question"
          ],
        ],
        // Row One
        [
          [
            '' // Never displayed
            // "Ask a world/narrative-based question 'Yes/No' question",
            // "Evaluate the likelihood",
            // "Tap here to roll"
          ],
          [
            // Entry One
            'No',
            "You fail",
            "Success may not have been possible"
          ],
          [
            // Entry Two
            'Yes',
            "Now roll on tables or use narrative",
            "Search 'Cascading' to display several tables suitable for results"
          ],

        ],

      ],
      tags: ['complex', 'yes', 'no', 'yes/no', 'cascading'],
      rollCaps: {
        rollOneMax: 2, // All rolls for this oracle are capped at 2
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
    mockOracleService = jasmine.createSpyObj(
      'OraclePinService',
      ['setOracleCategory', 'setPinnedOracles', 'getPinnedOracles'],
      { filteredOracles$: of(testOracles) }
    )

    const mockUrlSubject = new BehaviorSubject<UrlSegment[]>([
      new UrlSegment(ROUTER_TOKENS.ALL, {})
    ]);
    const mockParamMapSubject = new BehaviorSubject<ParamMap>(convertToParamMap({}));
    const mockQueryParamMapSubject = new BehaviorSubject<ParamMap>(convertToParamMap({}));

    const mockActivatedRoute = {
      url: mockUrlSubject.asObservable(),
      paramMap: mockParamMapSubject.asObservable(),
      queryParamMap: mockQueryParamMapSubject.asObservable(),
      snapshot: {
        paramMap: mockParamMapSubject.getValue(),
        queryParamMap: mockQueryParamMapSubject.getValue()
      }
    };


    await TestBed.configureTestingModule({
      imports: [Body],
      providers: [
        provideZonelessChangeDetection(),
        { provide: storageToken, useValue: testLocation },
        { provide: OraclePinService, useValue: mockOracleService },
        provideLocationMocks(),
        provideRouter([
          {
            path: '',
            redirectTo: ROUTER_TOKENS.SIMPLE,
            pathMatch: 'full',
          },
          {
            path: ROUTER_TOKENS.SIMPLE,
            component: Body,
          },
          {
            path: ROUTER_TOKENS.ADVANCED,
            component: Body,
          },
          {
            path: ROUTER_TOKENS.ALL,
            component: Body,
          },
          {
            path: '**',
            redirectTo: ROUTER_TOKENS.SIMPLE
          }]),
        {
          provide: ActivatedRoute,
          useValue: mockActivatedRoute
        },
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(Body);
    component = fixture.componentInstance;

    mockOracleService.getPinnedOracles.and.returnValue(of([]));

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should produce a list item for each oracle in oracles.ts`, () => {
    const listItemCount = fixture.debugElement.queryAll(By.css('li')).length

    expect(listItemCount).toEqual(4)
  })
});
