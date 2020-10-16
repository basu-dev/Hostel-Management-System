import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllocateUserComponent } from './allocate-user.component';

describe('AllocateUserComponent', () => {
  let component: AllocateUserComponent;
  let fixture: ComponentFixture<AllocateUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllocateUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllocateUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
