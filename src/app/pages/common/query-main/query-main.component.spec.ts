/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { QueryMainComponent } from './query-main.component';

describe('QueryMainComponent', () => {
  let component: QueryMainComponent;
  let fixture: ComponentFixture<QueryMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QueryMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QueryMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
