import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SonyLivComponent } from './sony-liv.component';

describe('SonyLivComponent', () => {
  let component: SonyLivComponent;
  let fixture: ComponentFixture<SonyLivComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SonyLivComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SonyLivComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
