import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentMarksheetComponent } from './student-marksheet.component';

describe('StudentMarksheetComponent', () => {
  let component: StudentMarksheetComponent;
  let fixture: ComponentFixture<StudentMarksheetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentMarksheetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentMarksheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
