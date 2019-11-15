import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowIncidencePopupPage } from './show-incidence-popup.page';

describe('ShowIncidencePopupPage', () => {
  let component: ShowIncidencePopupPage;
  let fixture: ComponentFixture<ShowIncidencePopupPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowIncidencePopupPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowIncidencePopupPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
