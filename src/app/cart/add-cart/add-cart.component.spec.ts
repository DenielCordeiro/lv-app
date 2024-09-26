import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCartComponent } from './add-cart.component';

describe('AddCartComponent', () => {
  let component: AddCartComponent;
  let fixture: ComponentFixture<AddCartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddCartComponent]
    });
    fixture = TestBed.createComponent(AddCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
