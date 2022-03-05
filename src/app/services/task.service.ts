import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { Task } from 'src/app/Task';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http:HttpClient) { }

  getTasks():Observable<Task[]>{
    return this.http.get<Task[]>( "http://localhost:5000/tasks" );
  }
  deleteTask(task:Task):Observable<Task>
  {
   const id = task.id;
   const urlDelete = `http://localhost:5000/tasks/${id}`;

    return this.http.delete<Task>(urlDelete);
  }

  updateTask(task:Task):Observable<Task>{
     const id = task.id;
    const urlUpdate= `http://localhost:5000/tasks/${id}`;
    return this.http.put<Task>( urlUpdate , task,httpOptions);
  }

  saveTask(task:Task):Observable<Task>{
    const url="http://localhost:5000/tasks"
    return this.http.post<Task>(url, task, httpOptions);
  }
}
