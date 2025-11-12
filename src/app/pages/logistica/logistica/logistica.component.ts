import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logistica',
  standalone: true,
  imports: [],
  templateUrl: './logistica.component.html',
  styleUrl: './logistica.component.css'
})
export class LogisticaComponent {

  router = inject(Router)

  productoIntreso(){
      this.router.navigate(['/productoingreso'])
  }
  productoLista(){
      this.router.navigate(['/productolista'])
  }
  productoTotales(){
      this.router.navigate(['/productototales'])
  }
  proveedores(){
      this.router.navigate(['/proveedores'])
  }
}
