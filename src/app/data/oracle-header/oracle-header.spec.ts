import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OracleHeader } from './oracle-header';

describe('OracleHeader', () => {
  let component: OracleHeader;
  let fixture: ComponentFixture<OracleHeader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OracleHeader]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OracleHeader);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
