import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchClinicPage } from './search-clinic.page';

describe('SearchClinicPage', () => {
  let component: SearchClinicPage;
  let fixture: ComponentFixture<SearchClinicPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchClinicPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchClinicPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
