import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderProductsComponent } from './header-products.component';

describe('HeaderProductsComponent', () => {
  let component: HeaderProductsComponent;
  let fixture: ComponentFixture<HeaderProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderProductsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
