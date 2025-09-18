import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CascadingOracle } from './cascading-oracle';

describe('CascadingOracle', () => {
  let component: CascadingOracle;
  let fixture: ComponentFixture<CascadingOracle>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CascadingOracle]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CascadingOracle);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
