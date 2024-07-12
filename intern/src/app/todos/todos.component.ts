import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {
  completedTodos: any[] = [];
  incompleteTodos: any[] = [];
  userId!: number;

  constructor(private route: ActivatedRoute, private dataService: DataService) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.userId = +params['userId']; // Convert string to number
      if (this.userId) {
        this.dataService.getTodos(this.userId).subscribe(todos => {
          this.completedTodos = todos.filter(todo => todo.completed);
          this.incompleteTodos = todos.filter(todo => !todo.completed);
        });
      }
    });
  }
}
