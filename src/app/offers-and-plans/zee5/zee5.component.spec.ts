import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Zee5Component } from './zee5.component';

describe('Zee5Component', () => {
  let component: Zee5Component;
  let fixture: ComponentFixture<Zee5Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Zee5Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Zee5Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
