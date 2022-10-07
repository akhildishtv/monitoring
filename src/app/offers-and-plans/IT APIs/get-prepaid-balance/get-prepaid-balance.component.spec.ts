import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetPrepaidBalanceComponent } from './get-prepaid-balance.component';

describe('GetPrepaidBalanceComponent', () => {
  let component: GetPrepaidBalanceComponent;
  let fixture: ComponentFixture<GetPrepaidBalanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetPrepaidBalanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GetPrepaidBalanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
