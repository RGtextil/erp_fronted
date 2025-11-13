import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ventas',
  standalone: true,
  imports: [],
  templateUrl: './ventas.component.html',
  styleUrl: './ventas.component.css'
})
export class VentasComponent {
  router = inject(Router)

  clientaingreso(){
      this.router.navigate(['/clienteingreso'])
  }
  clientelista(){
      this.router.navigate(['/clientelista'])
  }
  pedido(){
      this.router.navigate(['/pedido'])
  }
}
