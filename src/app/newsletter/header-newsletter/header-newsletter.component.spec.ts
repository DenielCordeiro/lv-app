import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderNewsletterComponent } from './header-newsletter.component';

describe('HeaderNewsletterComponent', () => {
  let component: HeaderNewsletterComponent;
  let fixture: ComponentFixture<HeaderNewsletterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderNewsletterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderNewsletterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
