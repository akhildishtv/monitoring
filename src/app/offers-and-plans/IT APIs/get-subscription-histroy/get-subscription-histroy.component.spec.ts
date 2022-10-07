import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetSubscriptionHistroyComponent } from './get-subscription-histroy.component';

describe('GetSubscriptionHistroyComponent', () => {
  let component: GetSubscriptionHistroyComponent;
  let fixture: ComponentFixture<GetSubscriptionHistroyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetSubscriptionHistroyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GetSubscriptionHistroyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
