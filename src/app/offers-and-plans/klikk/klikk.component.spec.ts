import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KlikkComponent } from './klikk.component';

describe('KlikkComponent', () => {
  let component: KlikkComponent;
  let fixture: ComponentFixture<KlikkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KlikkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KlikkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
