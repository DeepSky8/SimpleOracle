import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Searchbar } from './searchbar';
import { inject, Injector, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter, Router } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { By } from '@angular/platform-browser';

describe('Searchbar', () => {
  let component: Searchbar;
  let fixture: ComponentFixture<Searchbar>;
  let harness: RouterTestingHarness;
  let router: Router;
  let routerSpy: jasmine.Spy;


  beforeEach(async () => {



    await TestBed.configureTestingModule({
      imports: [Searchbar],
      providers: [
        provideZonelessChangeDetection(),
        provideRouter([
          { path: 'all', component: Searchbar },
          { path: 'simple', component: Searchbar },
          { path: '**', component: Searchbar }
        ]),

      ]
    })
      .compileComponents();



    harness = await RouterTestingHarness.create();
    await harness.navigateByUrl('/all?filter=a', Searchbar)

    fixture = TestBed.createComponent(Searchbar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should parse the queryParam and enter it into the searchbar', () => {

    const searchInput = fixture.debugElement.query(By.css('#oracleSearch')).properties['value'];

    expect(searchInput).toEqual('a');
    expect(component.filterText).toEqual('a');
  });

  it('should clear filterText when onResetClick is called', () => {
    const resetButton = fixture.debugElement.query(By.css('#resetSearch'));
    resetButton.triggerEventHandler('click');
    fixture.detectChanges();

    expect(component.filterText).toEqual('');
  });


});
