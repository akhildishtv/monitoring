import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KalturaLoginComponent } from './kaltura-login.component';

describe('KalturaLoginComponent', () => {
  let component: KalturaLoginComponent;
  let fixture: ComponentFixture<KalturaLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KalturaLoginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KalturaLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
