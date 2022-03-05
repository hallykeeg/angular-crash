import { Component, OnInit,Input,Output, EventEmitter } from '@angular/core';
import { Task } from 'src/app/Task';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.css']
})
export class TaskItemComponent implements OnInit {

  faTimes=faTimes;
  
  @Input() task:Task={text:'',day:'',reminder:false};
  @Output() deleteEvent = new EventEmitter<Task>();

  @Output() dblClickEvent = new EventEmitter<Task>();

  constructor() { }

  ngOnInit(): void {
  }
  onDelete(task:Task){
    this.deleteEvent.emit(task);
  }
  onDblClick(task:Task){
    this.dblClickEvent.emit(task);
  }

}
