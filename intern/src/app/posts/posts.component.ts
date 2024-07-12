import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  users: any[] = [];
  posts: any[] = [];
  selectedPost: any = null;

  constructor(private dataService: DataService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const userId = +params['userId']; // Convert string to number
      this.dataService.getUsers().subscribe(users => {
        this.users = users;
      });

      this.dataService.getPosts().subscribe(posts => {
        if (userId) {
          this.posts = posts.filter(post => post.userId === userId);
        } else {
          this.posts = posts;
        }
      });
    });
  }

  viewDetails(post: any): void {
    this.selectedPost = post;
  }

  closeDetails(): void {
    this.selectedPost = null;
  }

  getUser(userId: number): any {
    return this.users.find(user => user.id === userId);
  }
}
