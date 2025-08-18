import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Body } from './body';
import { provideZonelessChangeDetection } from '@angular/core';
import { By } from '@angular/platform-browser';
import { oracles } from '../../data/oracles';

describe('Body', () => {
  let component: Body;
  let fixture: ComponentFixture<Body>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Body],
      providers: [provideZonelessChangeDetection()]
    })
      .compileComponents();

    fixture = TestBed.createComponent(Body);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should produce a list item for each oracle in oracles.ts`, () => {
    const listItemCount = fixture.debugElement.queryAll(By.css('li')).length

    expect(listItemCount).toEqual(oracles.length)
  })
});
