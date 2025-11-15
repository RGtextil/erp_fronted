import { Component, inject } from '@angular/core';
import { Clientes } from '../../../interfaces/clientes';
import { ClienteService } from '../../../services/clientes/cliente.service';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { ProductoService } from '../../../services/producto/producto.service';
import { Producto } from '../../../interfaces/producto';
import { PedidoClienteService } from '../../../services/pedidos/pedido-cliente.service';
import { Pedido } from '../../../interfaces/pedido';
@Component({
  selector: 'app-pedido',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './pedido.component.html',
  styleUrl: './pedido.component.css'
})
export class PedidoComponent {
  
  clienteService = inject(ClienteService);
  productoServicio = inject(ProductoService);
  pedidoServicio = inject(PedidoClienteService)

  listaServicios: Clientes[] = [];
  listaProductos: Producto[] = [];
  
  formCliente!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.cargarClientes();
    this.cargarProducto();
  
    this.formCliente = this.fb.group({
      cliente: [{ value: '', disabled: true }],  // SOLO LECTURA
      //cliente: ['', [Validators.required]],
      clientes: [[]], // select múltiple
      tela: [{ value: '', disabled: true }],  // SOLO LECTURA
      //tela: [[Validators.required]],
      productos: [[]], // select múltiple
      color: [{ value: '', disabled: true }],  // SOLO LECTURA
      //color: [[Validators.required]],
      colores: [[]], // select múltiple
      cantidad: [[Validators.required, Validators.min(0)]],
    });

    // Cada vez que cambia la selección, actualiza el input
    this.formCliente.get('clientes')?.valueChanges.subscribe(values => {
      const seleccionados = this.listaServicios
        .filter(s => values?.includes(s.id))
        .map(s => s.nombre)
        .join(', ');

      this.formCliente.patchValue({ cliente: seleccionados }, { emitEvent: false });
     });


    this.formCliente.get('productos')?.valueChanges.subscribe(values => {
      const seleccionados = this.listaProductos
        .filter(s => values?.includes(s.id))
        .map(s => s.producto_nombre)
        .join(', ');

      this.formCliente.patchValue({ tela: seleccionados }, { emitEvent: false });
    });

    this.formCliente.get('colores')?.valueChanges.subscribe(values => {
      const seleccionados = this.listaProductos
        .filter(s => values?.includes(s.id))
        .map(s => s.producto_color)
        .join(', ');

      this.formCliente.patchValue({ color: seleccionados }, { emitEvent: false });
    });
  }

  cargarClientes() {
    this.clienteService.getAll().subscribe((res) => {
      this.listaServicios = res;
    });
  }

  cargarProducto(){
    this.productoServicio.getAll().subscribe((res) => {
      this.listaProductos = res
      }
    )
  }
guardar() {
  if (this.formCliente.invalid) return;

  // Creamos el objeto Pedido con fecha automática
  const payload: Pedido = {
    cliente: this.formCliente.get('cliente')?.value,
    tela: this.formCliente.get('tela')?.value,
    color: this.formCliente.get('color')?.value,
    cantidad: this.formCliente.get('cantidad')?.value,
    fecha_pedido: new Date().toISOString() // fecha y hora actual
  };

  // Enviar al servicio
  this.pedidoServicio.create(payload).subscribe({
    next: (res) => {
      console.log('Guardado correctamente', res);
      this.formCliente.reset(); // reinicia el formulario
    },
    error: (err) => console.error('Error al guardar:', err)
  });

  console.log("Datos enviados:", payload);
}


}
