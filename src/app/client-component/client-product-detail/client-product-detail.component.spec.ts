import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientProductDetailComponent } from './client-product-detail.component';

describe('ClientProductDetailComponent', () => {
  let component: ClientProductDetailComponent;
  let fixture: ComponentFixture<ClientProductDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientProductDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientProductDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
