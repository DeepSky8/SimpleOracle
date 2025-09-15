import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Searchbar } from './searchbar';
import { provideZonelessChangeDetection } from '@angular/core';

describe('Searchbar', () => {
  let component: Searchbar;
  let fixture: ComponentFixture<Searchbar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Searchbar],
      providers: [
        provideZonelessChangeDetection(),

      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(Searchbar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
