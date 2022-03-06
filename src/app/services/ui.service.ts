import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Task } from '../Task';
@Injectable({
  providedIn: 'root'
})
export class UiService {

  private showAddTask:boolean = false;
  private subject= new Subject<any>();

  private editTask:boolean = false;
  private subjectEdit= new Subject<any>();

  private task!:Task;
  private subjectTask= new Subject<Task>();
  

  constructor() { }

  toggleAddTask() {
    this.showAddTask=!this.showAddTask;

    this.subject.next(this.showAddTask);
  }

  toggleEditTask() {
    this.editTask=!this.editTask;

    this.subjectEdit.next(this.editTask);
  }
  onToggleEdit():Observable<any>{
    return this.subjectEdit.asObservable();
  }

  onToggle():Observable<any>{
    return this.subject.asObservable();
  }
  setTask(task:Task){
    this.task=task;
    this.subjectTask.next(task);
  }
  onEditTask():Observable<Task>{
    return this.subjectTask.asObservable();
  }
}

