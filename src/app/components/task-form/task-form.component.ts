import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent {
  @Output() taskAdded = new EventEmitter<Task>();

  taskForm = new FormGroup({
    title: new FormControl(''),
    description: new FormControl(''),
  });

  submitForm() {
    const newTask: Task = {
      id: Date.now(),
      title: this.taskForm.value.title!,
      description: this.taskForm.value.description!,
      completed: false
    };

    this.taskAdded.emit(newTask);
    this.taskForm.reset();
  }
}
