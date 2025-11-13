import { Component, inject } from '@angular/core';
import { Clientes } from '../../../interfaces/clientes';
import { ClienteService } from '../../../services/clientes/cliente.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-pedido',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './pedido.component.html',
  styleUrl: './pedido.component.css'
})
export class PedidoComponent {
  productos: Clientes[] = [];
  clienteService = inject(ClienteService)
  // Lista original de clientes


  // Lista filtrada
  clientesFiltrados: Clientes[] = [];
  filtroControl = new FormControl('');
  // Texto del filtro
  filtro: string = '';

  ngOnInit(): void {
    this.cargarProductos()
    this.clientesFiltrados = this.productos; // Mostrar todos al inicio
    // Escuchar cambios del filtro
    this.filtroControl.valueChanges
      .pipe(debounceTime(200)) // retrasa un poco para no filtrar en cada tecla
      .subscribe(valor => {
        this.aplicarFiltro(valor || '');
      });
  }
  cargarProductos(): void {
    this.clienteService.getAll().subscribe({
      next: data => this.productos = data,
      error: err => console.error('Error cargando productos', err)
    });
  }
 
  aplicarFiltro(texto: string): void {
    const filtro = texto.toLowerCase();
    this.clientesFiltrados = this.productos.filter(cliente =>
      cliente.nombre.toLowerCase().includes(filtro) ||
      cliente.correo.toLowerCase().includes(filtro) ||
      cliente.telefono.toString().includes(filtro)
    );
  }
}
