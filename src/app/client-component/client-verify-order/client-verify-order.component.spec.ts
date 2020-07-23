import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientVerifyOrderComponent } from './client-verify-order.component';

describe('ClientVerifyOrderComponent', () => {
  let component: ClientVerifyOrderComponent;
  let fixture: ComponentFixture<ClientVerifyOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientVerifyOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientVerifyOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
