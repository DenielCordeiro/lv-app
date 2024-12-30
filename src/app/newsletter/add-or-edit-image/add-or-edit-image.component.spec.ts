import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOrEditImageComponent } from './add-or-edit-image.component';

describe('AddOrEditImageComponent', () => {
  let component: AddOrEditImageComponent;
  let fixture: ComponentFixture<AddOrEditImageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddOrEditImageComponent]
    });
    fixture = TestBed.createComponent(AddOrEditImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
