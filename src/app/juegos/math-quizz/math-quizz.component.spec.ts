import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MathQuizzComponent } from './math-quizz.component';

describe('MathQuizzComponent', () => {
  let component: MathQuizzComponent;
  let fixture: ComponentFixture<MathQuizzComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MathQuizzComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MathQuizzComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
