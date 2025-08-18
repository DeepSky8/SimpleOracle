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
});
