import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClinicPage } from './clinic.page';

describe('ClinicPage', () => {
  let component: ClinicPage;
  let fixture: ComponentFixture<ClinicPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClinicPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClinicPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
