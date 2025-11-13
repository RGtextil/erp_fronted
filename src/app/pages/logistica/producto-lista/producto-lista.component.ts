import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Producto } from '../../../interfaces/producto';
import { ProductoService } from '../../../services/producto/producto.service';

@Component({
  selector: 'app-producto-lista',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './producto-lista.component.html',
  styleUrls: ['./producto-lista.component.css']
})
export class ProductoListaComponent implements OnInit {
  productos: Producto[] = [];
  productoSeleccionado?: Producto;
  form!: FormGroup;

  constructor(private productoService: ProductoService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.cargarProductos();

    // Inicializar formulario vacío
    this.form = this.fb.group({
      producto_nombre: ['', Validators.required],
      producto_metros: [0, [Validators.required, Validators.min(0)]]
    });
  }

  cargarProductos(): void {
    this.productoService.getAll().subscribe({
      next: data => this.productos = data,
      error: err => console.error('Error cargando productos', err)
    });
  }

  seleccionarProducto(producto: Producto): void {
    this.productoSeleccionado = { ...producto };

    // Actualizar formulario con valores del producto
    this.form.patchValue({
      producto_nombre: producto.producto_nombre,
      producto_metros: producto.producto_metros
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

    const updatedProducto: Producto = {
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
