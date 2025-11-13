import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ClienteService } from '../../../services/clientes/cliente.service';
import { Clientes } from '../../../interfaces/clientes';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cliente-ingreso',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './cliente-ingreso.component.html',
  styleUrl: './cliente-ingreso.component.css'
})
export class ClienteIngresoComponent {

  loading = false;
  successMessage = '';
  errorMessage = '';

  form = this.fb.group({
    nombre: ['', [Validators.required, Validators.minLength(3)]],
    correo: ['', Validators.required],
    telefono: [null, [Validators.required, Validators.min(1)]]
  });

  constructor(
    private fb: FormBuilder,
    private clienteService: ClienteService
  ) {}

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.successMessage = '';
    this.errorMessage = '';

    const cliente: Clientes = {
      nombre: this.form.value.nombre!,
      correo: this.form.value.correo!,
      telefono: this.form.value.telefono!
    };

    this.clienteService.create(cliente).subscribe({
      next: (res) => {
        this.loading = false;
        this.successMessage = '✅ cliente registrada correctamente';
        console.log('Respuesta del servidor:', res);
        this.form.reset();
      },
      error: (err) => {
        this.loading = false;
        console.error('❌ Error al guardar:', err);
        this.errorMessage = 'Error al guardar la propiedad';
      }
    });
  }
}
