import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Oracle } from './oracle';
import { provideZonelessChangeDetection } from '@angular/core';

describe('Oracle', () => {
  let component: Oracle;
  let fixture: ComponentFixture<Oracle>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Oracle],
      providers: [provideZonelessChangeDetection()]
    })
      .compileComponents();

    fixture = TestBed.createComponent(Oracle);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
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
