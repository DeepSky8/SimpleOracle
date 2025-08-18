import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OracleSelector } from './oracle-selector';
import { provideZonelessChangeDetection } from '@angular/core';

describe('OracleSelector', () => {
  let component: OracleSelector;
  let fixture: ComponentFixture<OracleSelector>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OracleSelector],
      providers: [provideZonelessChangeDetection()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OracleSelector);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
