import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentStudentComponent } from './payment-student.component';

describe('PaymentStudentComponent', () => {
  let component: PaymentStudentComponent;
  let fixture: ComponentFixture<PaymentStudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentStudentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
