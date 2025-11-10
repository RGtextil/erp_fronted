import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class Login implements OnInit {
  loginForm!: FormGroup;

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {}

  ngOnInit(): void {

    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });

  }
  get email() { return this.loginForm.get('email')!; }
  get password() { return this.loginForm.get('password')!; }

  onSubmit() {
    if (this.loginForm.valid) {
      this.auth.login(this.loginForm.value as any).subscribe({
        next: () => this.router.navigate(['/dashboard']),
        error: () => alert('Credenciales incorrectas'),
      });
    }
  }
}

