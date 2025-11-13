import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth/auth.service';
@Component({
  selector: 'app-register',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
  standalone: true
})
export class Register implements OnInit {
  registerForm!: FormGroup

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      password2: ['', [Validators.required, Validators.minLength(6)]],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
    });
  }


  get email() { return this.registerForm.get('email')!; }
  get username() { return this.registerForm.get('username')!; }
  get phone() { return this.registerForm.get('phone')!; }
  get password() { return this.registerForm.get('password')!; }
  get password2() { return this.registerForm.get('password2')!; }

  onSubmit() {
    if (this.registerForm.valid) {
      const { password, password2 } = this.registerForm.value;
      if (password !== password2) {
        alert('Las contraseñas no coinciden');
        return;
      }

      this.auth.register(this.registerForm.value as any).subscribe({
        next: () => {
          alert('Registro exitoso');
          this.router.navigate(['/login']);
        },
        error: (err) => alert(JSON.stringify(err.error))

      });
    console.log(this.registerForm.value)

    }
  }
}
