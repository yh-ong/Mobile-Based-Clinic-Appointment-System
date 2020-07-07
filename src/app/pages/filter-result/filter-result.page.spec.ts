import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterResultPage } from './filter-result.page';

describe('FilterResultPage', () => {
  let component: FilterResultPage;
  let fixture: ComponentFixture<FilterResultPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterResultPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterResultPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
