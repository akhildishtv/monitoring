import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetSubscriptionWithLoginComponent } from './get-subscription-with-login.component';

describe('GetSubscriptionWithLoginComponent', () => {
  let component: GetSubscriptionWithLoginComponent;
  let fixture: ComponentFixture<GetSubscriptionWithLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetSubscriptionWithLoginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GetSubscriptionWithLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
