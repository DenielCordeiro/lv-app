import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BodyNewsletterComponent } from './body-newsletter.component';

describe('BodyNewsletterComponent', () => {
  let component: BodyNewsletterComponent;
  let fixture: ComponentFixture<BodyNewsletterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BodyNewsletterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BodyNewsletterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
