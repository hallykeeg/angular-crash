import { Component, OnInit,Output, EventEmitter } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';
import { UiService } from 'src/app/services/ui.service';
import { Task } from 'src/app/Task';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  @Output() fillAddTask = new EventEmitter<Task>();

  tasks:Task[]=[];

  constructor(private taskService:TaskService,private uiService:UiService) { }

  ngOnInit(): void {
   this.taskService.getTasks().subscribe(tasks=>{
      this.tasks=tasks;
   });
  }
  deleteTask(task:Task)
  {
    this.taskService.deleteTask(task).subscribe(
      ()=>{
        this.tasks=this.tasks.filter(t => t.id !== task.id)
      }
    );
  }

  toggleReminder(task:Task){
    task.reminder=!task.reminder;
    this.taskService.updateTask(task).subscribe();
    
  }

  saveTask(task:Task){
    

    this.taskService.saveTask(task).subscribe((t)=>{
      this.tasks.push(t);
      
    });
  }
  editTask(task:Task){
    this.taskService.updateTask(task).subscribe(
      t =>{
        this.tasks.map((tache,index)=>{
          if(tache.id==t.id){
            this.tasks[index]=t;
          }
        })
      }
    );
  }

  forwardEvent(task:Task){
    
    this.uiService.setTask(task);
  }

}
