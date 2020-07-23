import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowManufacturerComponent } from './show-manufacturer.component';

describe('ShowManufacturerComponent', () => {
  let component: ShowManufacturerComponent;
  let fixture: ComponentFixture<ShowManufacturerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowManufacturerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowManufacturerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
