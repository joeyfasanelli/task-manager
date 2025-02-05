import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskFormComponent } from './task-form.component';
import { ReactiveFormsModule } from '@angular/forms'; // ✅ Import if using forms
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'; // ✅ Helps with unknown child components

describe('TaskFormComponent', () => {
  let component: TaskFormComponent;
  let fixture: ComponentFixture<TaskFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TaskFormComponent], // ✅ Declare the component
      imports: [ReactiveFormsModule], // ✅ Import necessary modules
      schemas: [CUSTOM_ELEMENTS_SCHEMA] // ✅ Helps ignore unknown child components
    }).compileComponents();

    fixture = TestBed.createComponent(TaskFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

