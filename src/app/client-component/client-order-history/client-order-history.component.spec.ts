import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientOrderHistoryComponent } from './client-order-history.component';

describe('ClientOrderHistoryComponent', () => {
  let component: ClientOrderHistoryComponent;
  let fixture: ComponentFixture<ClientOrderHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientOrderHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientOrderHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
