import { Component, inject } from '@angular/core';
import { ProveedorService } from '../../../services/proveedor/proveedor.service';
import { ProductoService } from '../../../services/producto/producto.service';
import { PedidosProveedorService } from '../../../services/pedidosproveedor/pedidos-proveedor.service';
import { Proveedor } from '../../../interfaces/proveedor';
import { Producto } from '../../../interfaces/producto';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PedidoProveedor } from '../../../interfaces/pedidoProveedor';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-producto-pedido',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './producto-pedido.component.html',
  styleUrl: './producto-pedido.component.css'
})
export class ProductoPedidoComponent {

  proveedorServicio = inject(ProveedorService);
  productoServicio = inject(ProductoService);
  pedidoProveedor = inject(PedidosProveedorService)
  fb = inject(FormBuilder)

  listaProveedores: Proveedor[] = [];
  listaProductos: Producto[] = [];

  formProveedor!: FormGroup;

  ngOnInit() {
    this.cargarClientes();
    this.cargarProducto();
  
    this.formProveedor = this.fb.group({
      proveedor: [{ value: '', disabled: true }],  // SOLO LECTURA
      //cliente: ['', [Validators.required]],
      proveedores: [[]], // select múltiple
      tela: [{ value: '', disabled: true }],  // SOLO LECTURA
      //tela: [[Validators.required]],
      productos: [[]], // select múltiple
      color: [{ value: '', disabled: true }],  // SOLO LECTURA
      //color: [[Validators.required]],
      colores: [[]], // select múltiple
      cantidad: [[Validators.required, Validators.min(0)]],
    });

    // Cada vez que cambia la selección, actualiza el input
    this.formProveedor.get('proveedores')?.valueChanges.subscribe(values => {
      const seleccionados = this.listaProveedores
        .filter(s => values?.includes(s.id))
        .map(s => s.nombre)
        .join(', ');

      this.formProveedor.patchValue({ proveedor: seleccionados }, { emitEvent: false });
     });


    this.formProveedor.get('productos')?.valueChanges.subscribe(values => {
      const seleccionados = this.listaProductos
        .filter(s => values?.includes(s.id))
        .map(s => s.producto_nombre)
        .join(', ');

      this.formProveedor.patchValue({ tela: seleccionados }, { emitEvent: false });
    });

    this.formProveedor.get('colores')?.valueChanges.subscribe(values => {
      const seleccionados = this.listaProductos
        .filter(s => values?.includes(s.id))
        .map(s => s.producto_color)
        .join(', ');

      this.formProveedor.patchValue({ color: seleccionados }, { emitEvent: false });
    });
  }

  cargarClientes() {
    this.proveedorServicio.getAll().subscribe((res) => {
      this.listaProveedores = res;
    });
  }

  cargarProducto(){
    this.productoServicio.getAll().subscribe((res) => {
      this.listaProductos = res
      }
    )
  }
guardar() {
  if (this.formProveedor.invalid) return;

  // Creamos el objeto Pedido con fecha automática
  const payload: PedidoProveedor = {
    proveedor: this.formProveedor.get('proveedor')?.value,
    tela: this.formProveedor.get('tela')?.value,
    color: this.formProveedor.get('color')?.value,
    cantidad: this.formProveedor.get('cantidad')?.value,
    fecha_pedido: new Date().toISOString() // fecha y hora actual
  };

  // Enviar al servicio
  this.pedidoProveedor.create(payload).subscribe({
    next: (res) => {
      console.log('Guardado correctamente', res);
      this.formProveedor.reset(); // reinicia el formulario
    },
    error: (err) => console.error('Error al guardar:', err)
  });

  console.log("Datos enviados:", payload);
}

}
