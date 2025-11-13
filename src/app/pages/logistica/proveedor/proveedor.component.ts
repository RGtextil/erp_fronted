import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProveedorService } from '../../../services/proveedor/proveedor.service';
import { Proveedor } from '../../../interfaces/proveedor';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-proveedor',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule],
  templateUrl: './proveedor.component.html',
  styleUrl: './proveedor.component.css'
})
export class ProveedorComponent implements OnInit {
  proveedores: Proveedor[] = []
 loading = false;
  successMessage = '';
  errorMessage = '';

  form = this.fb.group({
    nombre: ['', [Validators.required, Validators.minLength(3)]],
    direccion: ['', Validators.required],
    telefono: [null, [Validators.required, Validators.min(1)]]
  });

  constructor(
    private fb: FormBuilder,
    private proveedordService: ProveedorService
  ) {}


  ngOnInit(): void {
    this.cargarProductos();

  }
    cargarProductos(): void {
    this.proveedordService.getAll().subscribe({
      next: data => this.proveedores= data,
      error: err => console.error('Error cargando productos', err)
    });
  }


  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.successMessage = '';
    this.errorMessage = '';

    const producto: Proveedor= {
      nombre: this.form.value.nombre!,
      direccion: this.form.value.direccion!,
      telefono: this.form.value.telefono!
    };

    this.proveedordService.create(producto).subscribe({
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
    this.cargarProductos();
  }


}
