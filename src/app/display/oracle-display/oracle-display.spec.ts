import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OracleDisplay } from './oracle-display';
import { provideZonelessChangeDetection } from '@angular/core';

describe('OracleDisplay', () => {
  let component: OracleDisplay;
  let fixture: ComponentFixture<OracleDisplay>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OracleDisplay],
      providers: [provideZonelessChangeDetection()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OracleDisplay);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
