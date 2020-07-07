import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicalListPage } from './medical-list.page';

describe('MedicalListPage', () => {
  let component: MedicalListPage;
  let fixture: ComponentFixture<MedicalListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedicalListPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicalListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
