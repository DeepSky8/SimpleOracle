import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YnOracle } from './yn-oracle';
import { provideZonelessChangeDetection } from '@angular/core';
import { oracles } from '../oracles';
import { oracleType } from '../oracle.model';
import { By } from '@angular/platform-browser';
import { storageToken, testLocation } from '../library';
import { OraclePinService } from '../oracle.service';

describe('YnOracle', () => {
  let component: YnOracle;
  let fixture: ComponentFixture<YnOracle>;
  let mockOracleService = jasmine.createSpyObj('OraclePinService', ['pin', 'moveUp', 'moveDown','getOracles', 'getPinnedLength']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [YnOracle],
      providers: [
        provideZonelessChangeDetection(),
        { provide: storageToken, useValue: testLocation },
        { provide: OraclePinService, useValue: mockOracleService },

      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(YnOracle);
    fixture.componentRef.setInput('oracle', oracles[0])
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it("should only generate on type 'yesNo'", () => {
    expect(component.oracle.type).toEqual(oracleType.yesNo)
  })

  it(`should set/display the higher of two numbers as 'rollPrimary' when 'likely' is rolled`,
    () => {
      const likelyButton = fixture.debugElement.query(By.css('#odds0'))
      likelyButton.triggerEventHandler('click', null)
      fixture.detectChanges();

      expect(component.rollPrimary).toBeGreaterThanOrEqual(component.rollSecondary)
      expect(fixture.debugElement.query(By.css('#rollPrimary')).nativeElement.textContent).toContain(`Rolled: ${component.rollPrimary}`)
      expect(fixture.debugElement.query(By.css('#rollSecondary')).nativeElement.textContent).toContain(`(and ${component.rollSecondary})`)
    })

  it(`should generate/display a single number as 'rollPrimary' when 'average' is rolled`,
    () => {
      const averageButton = fixture.debugElement.query(By.css('#odds1'))
      averageButton.triggerEventHandler('click', null)
      fixture.detectChanges();

      expect(component.rollPrimary).toBeGreaterThan(0);
      expect(component.rollSecondary).toEqual(0);
      expect(fixture.debugElement.query(By.css('#rollPrimary')).nativeElement.textContent).toContain(`Rolled: ${component.rollPrimary}`)
      expect(fixture.nativeElement.querySelector('#rollSecondary')).toEqual(null)

    })

  it(`should set/display the lower of two numbers as 'rollPrimary' when 'unlikely' is rolled`,
    () => {
      const unlikelyButton = fixture.debugElement.query(By.css('#odds2'))
      unlikelyButton.triggerEventHandler('click', null)
      fixture.detectChanges();

      expect(component.rollSecondary).toBeGreaterThanOrEqual(component.rollPrimary)
      expect(fixture.debugElement.query(By.css('#rollPrimary')).nativeElement.textContent).toContain(`Rolled: ${component.rollPrimary}`)
      expect(fixture.debugElement.query(By.css('#rollSecondary')).nativeElement.textContent).toContain(`(and ${component.rollSecondary})`)
    })

  it(`should display the Oracle title`, () => {
    expect(fixture.debugElement.query(By.css('h2')).nativeElement.textContent).toEqual(oracles[0].title)
  })

  it(`should display introduction info when first loaded (rollPrimary is 0)`, () => {
    expect(component.descPrimary).toEqual(oracles[0].table[0][0][0])
    expect(fixture.debugElement.query(By.css('#descPrimary')).nativeElement.textContent).toEqual(oracles[0].table[0][0][0])

    expect(component.descSecondary).toEqual(oracles[0].table[0][0][1])
    expect(fixture.debugElement.query(By.css('#descSecondary')).nativeElement.textContent).toEqual(oracles[0].table[0][0][1])

    expect(component.descReminder).toEqual(oracles[0].table[0][0][2])
    expect(fixture.debugElement.query(By.css('#descReminder')).nativeElement.textContent).toEqual(oracles[0].table[0][0][2])
  })

  it(`should display the correct info when rollPrimary is greater than 0`, () => {
    const averageButton = fixture.debugElement.query(By.css('#odds1'))
    averageButton.triggerEventHandler('click', null)
    fixture.detectChanges();

    const rollPrimary = component.rollPrimary

    expect(component.descPrimary).toEqual(oracles[0].table[0][rollPrimary][0])
    expect(component.descSecondary).toEqual(oracles[0].table[0][rollPrimary][1])
    expect(component.descReminder).toEqual(oracles[0].table[0][rollPrimary][2])
  })



  it(`should return true if currentRoll is 1 or 6 and twistRoll is 1, passed to evaluateTwistRollDecrement`, () => {

    expect(component.evaluateTwistRollDecrement(1, 1)).toEqual(true)
    expect(component.evaluateTwistRollDecrement(6, 1)).toEqual(true)
    expect(component.evaluateTwistRollDecrement(1, 2)).toEqual(false)
    expect(component.evaluateTwistRollDecrement(2, 2)).toEqual(false)
  })


});
