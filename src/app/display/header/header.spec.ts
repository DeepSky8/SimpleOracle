import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core'

import { Header } from './header';
import { By } from '@angular/platform-browser';

describe('Header', () => {
  let component: Header;
  let fixture: ComponentFixture<Header>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Header],
      providers: [provideZonelessChangeDetection()]
    })
      .compileComponents();

    fixture = TestBed.createComponent(Header);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create text', () => {
    expect(component).toBeTruthy();
    expect(fixture.debugElement.query(By.css('h1')).nativeElement.textContent).toContain('Oracles');
    expect(fixture.debugElement.query(By.css('h3')).nativeElement.textContent).toContain('for solo-RPGs')
  });
});
