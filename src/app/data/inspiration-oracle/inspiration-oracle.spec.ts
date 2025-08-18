import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InspirationOracle } from './inspiration-oracle';
import { provideZonelessChangeDetection } from '@angular/core';

describe('InspirationOracle', () => {
  let component: InspirationOracle;
  let fixture: ComponentFixture<InspirationOracle>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InspirationOracle],
      providers: [provideZonelessChangeDetection()]
    })
      .compileComponents();

    fixture = TestBed.createComponent(InspirationOracle);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
