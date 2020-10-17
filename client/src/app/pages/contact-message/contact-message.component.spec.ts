import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactMessageComponent } from './contact-message.component';

describe('ContactMessageComponent', () => {
  let component: ContactMessageComponent;
  let fixture: ComponentFixture<ContactMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactMessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
