import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HowOracle } from './how-oracle';
import { oracleType } from '../oracle.model';
import { By } from '@angular/platform-browser';
import { oracles } from '../oracles';
import { provideZonelessChangeDetection } from '@angular/core';

describe('HowOracle', () => {
  let component: HowOracle;
  let fixture: ComponentFixture<HowOracle>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HowOracle],
      providers: [provideZonelessChangeDetection()]
    })
      .compileComponents();

    fixture = TestBed.createComponent(HowOracle);
    fixture.componentRef.setInput('oracle', oracles[1]);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("should only generate on type 'magnitude'", () => {
    expect(component.oracle.type).toEqual(oracleType.magnitude)
  })

  it(`should set/display the higher of two numbers as 'rollPrimary' when 'likely' is rolled`,
    () => {
      const likelyButton = fixture.debugElement.queryAll(By.css('button'))[0]
      likelyButton.triggerEventHandler('click', null)
      fixture.detectChanges();

      expect(component.rollPrimary).toBeGreaterThanOrEqual(component.rollSecondary)
      expect(fixture.debugElement.query(By.css('#rollPrimary')).nativeElement.textContent).toContain(`Rolled: ${component.rollPrimary}`)
      expect(fixture.debugElement.query(By.css('#rollSecondary')).nativeElement.textContent).toContain(`(and ${component.rollSecondary})`)
    })

  it(`should generate/display a single number as 'rollPrimary' when 'average' is rolled`,
    () => {
      const averageButton = fixture.debugElement.queryAll(By.css('button'))[1]
      averageButton.triggerEventHandler('click', null)
      fixture.detectChanges();

      expect(component.rollPrimary).toBeGreaterThan(0);
      expect(component.rollSecondary).toEqual(0);
      expect(fixture.debugElement.query(By.css('#rollPrimary')).nativeElement.textContent).toContain(`Rolled: ${component.rollPrimary}`)
      expect(fixture.nativeElement.querySelector('#rollSecondary')).toEqual(null)

    })

  it(`should set/display the lower of two numbers as 'rollPrimary' when 'unlikely' is rolled`,
    () => {
      const unlikelyButton = fixture.debugElement.queryAll(By.css('button'))[2]
      unlikelyButton.triggerEventHandler('click', null)
      fixture.detectChanges();

      expect(component.rollSecondary).toBeGreaterThanOrEqual(component.rollPrimary)
      expect(fixture.debugElement.query(By.css('#rollPrimary')).nativeElement.textContent).toContain(`Rolled: ${component.rollPrimary}`)
      expect(fixture.debugElement.query(By.css('#rollSecondary')).nativeElement.textContent).toContain(`(and ${component.rollSecondary})`)
    })


  it(`should display the Oracle title`, () => {
    expect(fixture.debugElement.query(By.css('h2')).nativeElement.textContent).toEqual(oracles[1].title)
  })

  it(`should display introduction info when first loaded (rollPrimary is 0)`, () => {
    expect(component.descPrimary).toEqual(oracles[1].table[0][0][0])
    expect(fixture.debugElement.query(By.css('#descPrimary')).nativeElement.textContent).toEqual(oracles[1].table[0][0][0])

    expect(component.descSecondary).toEqual(oracles[1].table[0][0][1])
    expect(fixture.debugElement.query(By.css('#descSecondary')).nativeElement.textContent).toEqual(oracles[1].table[0][0][1])

    expect(component.descReminder).toEqual(oracles[1].table[0][0][2])
    expect(fixture.debugElement.query(By.css('#descReminder')).nativeElement.textContent).toEqual(oracles[1].table[0][0][2])
  })

  it(`should display the correct info when rollPrimary is greater than 0`, () => {
    const averageButton = fixture.debugElement.queryAll(By.css('button'))[1]
    averageButton.triggerEventHandler('click', null)
    fixture.detectChanges();

    const rollPrimary = component.rollPrimary

    expect(component.descPrimary).toEqual(oracles[1].table[0][rollPrimary][0])
    expect(component.descSecondary).toEqual(oracles[1].table[0][rollPrimary][1])
    expect(component.descReminder).toEqual(oracles[1].table[0][rollPrimary][2])
  })

});
