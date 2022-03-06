import { Component, OnInit ,Output, EventEmitter} from '@angular/core';
import { Subscription } from 'rxjs';
import { UiService } from 'src/app/services/ui.service';

import { Task
 } from 'src/app/Task';
@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {

  @Output() onSave: EventEmitter <Task> = new EventEmitter();
  @Output() onEdit: EventEmitter <Task> = new EventEmitter();

  showAddTask:boolean=false;
  suscription!:Subscription;
  suscriptionPopulate!:Subscription;

  editTask:boolean = false;
  suscriptionEdit!:Subscription;

  id?:number;
  text:string="";
  day:string="";

  label:string="Add Task";
  editing:boolean=false;

  reminder : boolean=false;

  constructor(private uiService:UiService) { 
    this.suscription=this.uiService.onToggle().subscribe(value=>this.showAddTask=value);
    this.suscriptionEdit=this.uiService.onToggleEdit().subscribe(value=>this.editTask=value);
  
    this.suscriptionPopulate=this.uiService.onEditTask().subscribe(t=>{
      this.editing=true;
      this.uiService.toggleAddTask();
      this.uiService.toggleEditTask();
      this.populate(t);
    
    });
  }

  ngOnInit(): void {
  }

  saveTask(){
    if( !this.text || !this.day ){ alert('Complete all fields!'); return ; }
   let task : Task = {
      text:this.text,
      day: this.day,
      reminder : this.reminder
    }
    if(this.editing){
      task.id=this.id;
      
      this.onEdit.emit(task);
    }else{
      this.onSave.emit(task);

    }
    this.text='';
    this.day='';
    this.reminder=false;
    this.editing=false;
    this.uiService.toggleAddTask();

  }
  populate(task:Task){
    this.id=task.id;
    this.text=task.text;
    this.day=task.day;
    this.reminder=task.reminder;
   
  }

}
