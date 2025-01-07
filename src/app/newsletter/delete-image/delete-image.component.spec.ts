import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteImageComponent } from './delete-image.component';

describe('DeleteImageComponent', () => {
  let component: DeleteImageComponent;
  let fixture: ComponentFixture<DeleteImageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteImageComponent]
    });
    fixture = TestBed.createComponent(DeleteImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
