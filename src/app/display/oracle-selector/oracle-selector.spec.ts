import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OracleSelector } from './oracle-selector';

describe('OracleSelector', () => {
  let component: OracleSelector;
  let fixture: ComponentFixture<OracleSelector>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OracleSelector]
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
