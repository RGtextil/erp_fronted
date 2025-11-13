import { Component } from '@angular/core';
import { Clientes } from '../../../interfaces/clientes';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ClienteService } from '../../../services/clientes/cliente.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cliente-lista',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './cliente-lista.component.html',
  styleUrl: './cliente-lista.component.css'
})
export class ClienteListaComponent {
  productos: Clientes[] = [];
  productoSeleccionado?: Clientes;
  form!: FormGroup;

  constructor(private productoService: ClienteService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.cargarProductos();

    // Inicializar formulario vacío
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      correo: ['', Validators.required],
      telefono: [0, [Validators.required, Validators.min(0)]]
    });
  }

  cargarProductos(): void {
    this.productoService.getAll().subscribe({
      next: data => this.productos = data,
      error: err => console.error('Error cargando productos', err)
    });
  }

  seleccionarProducto(producto: Clientes): void {
    this.productoSeleccionado = { ...producto };

    // Actualizar formulario con valores del producto
    this.form.patchValue({
      nombre: producto.nombre,
      correo: producto.correo,
      telefono: producto.telefono
    });
  }

  eliminarProducto(id: number): void {
    if (confirm('¿Seguro que deseas eliminar este producto?')) {
      this.productoService.delete(id).subscribe({
        next: () => this.cargarProductos(),
        error: err => console.error('Error eliminando producto', err)
      });
    }
  }

  actualizarProducto(): void {
    if (!this.productoSeleccionado) return;

    const updatedProducto: Clientes = {
      ...this.productoSeleccionado,
      ...this.form.value
    };

    const idNumerico = Number(this.productoSeleccionado.id);

    this.productoService.update(idNumerico, updatedProducto).subscribe({
      next: () => {
        alert('Producto actualizado correctamente');
        this.productoSeleccionado = undefined;
        this.form.reset();
        this.cargarProductos();
      },
      error: err => console.error('Error actualizando producto', err)
    });
  }
}
