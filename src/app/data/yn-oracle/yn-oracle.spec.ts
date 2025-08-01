import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YnOracle } from './yn-oracle';

describe('YnOracle', () => {
  let component: YnOracle;
  let fixture: ComponentFixture<YnOracle>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [YnOracle]
    })
    .compileComponents();

    fixture = TestBed.createComponent(YnOracle);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
