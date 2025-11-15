import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
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

  private fb = inject(FormBuilder);
  private productodService = inject(ProductoService);


  form = this.fb.group({
    producto_nombre: ['', [Validators.required, Validators.minLength(3)]],
    producto_color: ['', Validators.required],
    producto_metros: [null, [Validators.required, Validators.min(1)]]
  });

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }


    const producto: Producto = {
      producto_nombre: this.form.value.producto_nombre!,
      producto_color: this.form.value.producto_color!,
      producto_metros: this.form.value.producto_metros!
    };

    this.productodService.create(producto).subscribe({
      next: () => {
        alert('ingresado')

        this.form.reset();
      },
      error: () => {
        alert('error')
      }
    });
  }


}
