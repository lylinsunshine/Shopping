import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientWishlistComponent } from './client-wishlist.component';

describe('ClientWishlistComponent', () => {
  let component: ClientWishlistComponent;
  let fixture: ComponentFixture<ClientWishlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientWishlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientWishlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
