import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: any[] = [];
  filteredUsers: any[] = [];
  searchText: string = '';

  constructor(private dataService: DataService, private router: Router) {}

  ngOnInit(): void {
    this.dataService.getUsers().subscribe(data => {
      this.users = data;
      this.filteredUsers = data; // Initialize filtered users with all users
    });
  }

  viewPosts(userId: number): void {
    this.router.navigate(['/posts'], { queryParams: { userId: userId } });
  }

  viewTodos(userId: number): void {
    this.router.navigate(['/todos'], { queryParams: { userId: userId } });
  }

  searchUsers(): void {
    if (!this.searchText) {
      this.filteredUsers = [...this.users]; // Reset to show all users when search text is empty
      return;
    }

    const searchTextLower = this.searchText.toLowerCase().trim();
    this.filteredUsers = this.users.filter(user =>
      user.name.toLowerCase().includes(searchTextLower) ||
      user.username.toLowerCase().includes(searchTextLower) || // Adjust to include username or any other relevant field
      user.email.toLowerCase().includes(searchTextLower)
    );
  }

  clearSearch(): void {
    this.searchText = '';
    this.filteredUsers = [...this.users]; // Clear search text and reset to show all users
  }

  onMouseOver(event: any): void {
    event.target.style.transform = 'scale(1.1)';
  }

  onMouseOut(event: any): void {
    event.target.style.transform = 'scale(1)';
  }
}
