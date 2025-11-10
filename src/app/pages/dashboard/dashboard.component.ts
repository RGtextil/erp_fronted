import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { User } from '../../interfaces/users';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  list: User[] = []

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {}

  ngOnInit(): void {

    this.auth.getProfile().subscribe({
      next: (user: User) => this.list.push(user),
      //next: (user: User) => this.userForm.patchValue(user),
      error: () => this.router.navigate(['/login']),
    });
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}

