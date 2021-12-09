import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebSeriesComponent } from './web-series.component';

describe('WebSeriesComponent', () => {
  let component: WebSeriesComponent;
  let fixture: ComponentFixture<WebSeriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebSeriesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebSeriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
