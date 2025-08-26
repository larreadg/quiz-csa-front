import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrossmathComponent } from './crossmath.component';

describe('CrossmathComponent', () => {
  let component: CrossmathComponent;
  let fixture: ComponentFixture<CrossmathComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrossmathComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrossmathComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
