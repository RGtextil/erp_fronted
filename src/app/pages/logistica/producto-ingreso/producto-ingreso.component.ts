import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductoService } from '../../../services/producto/producto.service';
import { Producto } from '../../../interfaces/producto';

@Component({
  selector: 'app-producto-ingreso',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './producto-ingreso.component.html',
  styleUrl: './producto-ingreso.component.css'
})
export class ProductoIngresoComponent {

  loading = false;
  successMessage = '';
  errorMessage = '';

  form = this.fb.group({
    producto_nombre: ['', [Validators.required, Validators.minLength(3)]],
    producto_color: ['', Validators.required],
    producto_metros: [null, [Validators.required, Validators.min(1)]]
  });

  constructor(
    private fb: FormBuilder,
    private productodService: ProductoService
  ) {}

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.successMessage = '';
    this.errorMessage = '';

    const producto: Producto = {
      producto_nombre: this.form.value.producto_nombre!,
      producto_color: this.form.value.producto_color!,
      producto_metros: this.form.value.producto_metros!
    };

    this.productodService.create(producto).subscribe({
      next: (res) => {
        this.loading = false;
        this.successMessage = '✅ Propiedad registrada correctamente';
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
