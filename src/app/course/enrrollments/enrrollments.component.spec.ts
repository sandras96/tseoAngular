import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnrrollmentsComponent } from './enrrollments.component';

describe('EnrrollmentsComponent', () => {
  let component: EnrrollmentsComponent;
  let fixture: ComponentFixture<EnrrollmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnrrollmentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnrrollmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
