import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { App } from './app';
import { storageToken, testLocation } from './data/library';
import { OraclePinService } from './data/oracle.service';

describe('App', () => {
  let mockOracleService = jasmine.createSpyObj('OraclePinService', ['getOracles', 'getPinnedLength']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [
        provideZonelessChangeDetection(),
        { provide: storageToken, useValue: testLocation },
        { provide: OraclePinService, useValue: mockOracleService },
      ]
    }).compileComponents();

  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

});
