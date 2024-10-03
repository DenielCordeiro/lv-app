import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOrRemoveCartComponent } from './add-or-remove-cart.component';

describe('AddCartComponent', () => {
  let component: AddOrRemoveCartComponent;
  let fixture: ComponentFixture<AddOrRemoveCartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddOrRemoveCartComponent]
    });
    fixture = TestBed.createComponent(AddOrRemoveCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
