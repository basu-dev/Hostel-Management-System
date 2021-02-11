import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffRegisterComponent } from './staff-register.component';

describe('StaffRegisterComponent', () => {
  let component: StaffRegisterComponent;
  let fixture: ComponentFixture<StaffRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StaffRegisterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
