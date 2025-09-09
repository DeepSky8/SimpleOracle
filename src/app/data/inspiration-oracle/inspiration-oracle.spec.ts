import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InspirationOracle } from './inspiration-oracle';
import { provideZonelessChangeDetection } from '@angular/core';
import { oracles } from '../oracles';
import { oracleType } from '../oracle.model';
import { By } from '@angular/platform-browser';
import { TitleCasePipe } from '@angular/common';
import { storageToken, testLocation } from '../library';
import { OraclePinService } from '../oracle.service';

describe('InspirationOracle', () => {
  let component: InspirationOracle;
  let fixture: ComponentFixture<InspirationOracle>;
  let mockOracleService = jasmine.createSpyObj('OraclePinService', ['getOracles', 'getPinnedLength']);


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InspirationOracle],
      providers: [
        provideZonelessChangeDetection(),
        { provide: storageToken, useValue: testLocation },
        { provide: OraclePinService, useValue: mockOracleService },
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(InspirationOracle);
    fixture.componentRef.setInput('oracle', oracles[2])
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("should only generate on type 'multiroll'", () => {
    expect(component.oracle.type).toEqual(oracleType.multiroll)
  })

  it(`should display the Oracle title`, () => {
    expect(fixture.debugElement.query(By.css('h2')).nativeElement.textContent).toEqual(oracles[2].title)
  })

  it(`should have a 'generateInspiration' button`, () => {
    expect(fixture.debugElement.query(By.css('#generateInspiration'))).toBeTruthy()
  })

  it(`should set six roll values and three text values`, () => {
    const generateButton = fixture.debugElement.query(By.css('#generateInspiration'))
    generateButton.triggerEventHandler('click', null)
    fixture.detectChanges()

    const v1 = component.descVerbRoll1
    const v2 = component.descVerbRoll2
    const vw = component.descVerb

    const n1 = component.descNounRoll1
    const n2 = component.descNounRoll2
    const nw = component.descNoun

    const a1 = component.descAdjectiveRoll1
    const a2 = component.descAdjectiveRoll2
    const aw = component.descAdjective

    expect(v1).toBeGreaterThan(0)
    expect(v2).toBeGreaterThan(0)
    expect(vw).toEqual(component.oracle.table[1][v1][v2])

    expect(n1).toBeGreaterThan(0)
    expect(n2).toBeGreaterThan(0)
    expect(nw).toEqual(component.oracle.table[2][n1][n2])

    expect(a1).toBeGreaterThan(0)
    expect(a2).toBeGreaterThan(0)
    expect(aw).toEqual(component.oracle.table[3][a1][a2])
  })

  it(`should set the verb/noun/adjective text to match the component text`, () => {
    const generateButton = fixture.debugElement.query(By.css('#generateInspiration'))
    generateButton.triggerEventHandler('click', null)
    fixture.detectChanges()

    const vw = component.descVerb
    const nw = component.descNoun
    const aw = component.descAdjective

    const titleCasePipe = new TitleCasePipe();
    expect(fixture.debugElement.query(By.css('#descVerb')).nativeElement.textContent).toEqual(titleCasePipe.transform(vw))
    expect(fixture.debugElement.query(By.css('#descNoun')).nativeElement.textContent).toEqual(titleCasePipe.transform(nw))
    expect(fixture.debugElement.query(By.css('#descAdjective')).nativeElement.textContent).toEqual(titleCasePipe.transform(aw))
  })


});
