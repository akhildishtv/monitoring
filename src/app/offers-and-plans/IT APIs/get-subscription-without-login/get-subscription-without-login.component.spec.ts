import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetSubscriptionWithoutLoginComponent } from './get-subscription-without-login.component';

describe('GetSubscriptionWithoutLoginComponent', () => {
  let component: GetSubscriptionWithoutLoginComponent;
  let fixture: ComponentFixture<GetSubscriptionWithoutLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetSubscriptionWithoutLoginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GetSubscriptionWithoutLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
