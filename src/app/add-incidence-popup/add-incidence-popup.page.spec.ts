import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddIncidencePopupPage } from './add-incidence-popup.page';

describe('AddIncidencePopupPage', () => {
  let component: AddIncidencePopupPage;
  let fixture: ComponentFixture<AddIncidencePopupPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddIncidencePopupPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddIncidencePopupPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
