import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import * as d3 from 'd3';
import { Producto } from '../../../interfaces/producto';
import { ProductoService } from '../../../services/producto/producto.service';

@Component({
  selector: 'app-producto-dashboard',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './producto-totales.component.html',
  styleUrls: ['./producto-totales.component.css']
})
export class ProductoTotales implements OnInit {
  @ViewChild('chart', { static: true }) chartContainer!: ElementRef;
  productos: Producto[] = [];
  productosFiltrados: Producto[] = [];
  filtroForm!: FormGroup;

  constructor(private productoService: ProductoService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.filtroForm = this.fb.group({
      nombre: [''],
      color: ['']
    });

    this.filtroForm.valueChanges.subscribe(() => this.aplicarFiltro());
    this.cargarProductos();
  }

  cargarProductos(): void {
    this.productoService.getAll().subscribe({
      next: (data) => {
        this.productos = data;
        this.productosFiltrados = [...this.productos];
        this.crearGrafico();
      },
      error: (err) => console.error(err)
    });
  }

  aplicarFiltro(): void {
    const { nombre, color } = this.filtroForm.value;
    this.productosFiltrados = this.productos.filter(p => {
      const nombreMatch = !nombre || p.producto_nombre?.toLowerCase().includes(nombre.toLowerCase());
      const colorMatch = !color || p.producto_color?.toLowerCase() === color.toLowerCase();
      return nombreMatch && colorMatch;
    });
    this.crearGrafico();
  }

  crearGrafico(): void {
    const element = this.chartContainer.nativeElement;
    d3.select(element).selectAll('*').remove(); // limpiar gráfico previo

    const data = this.productosFiltrados;
    const margin = { top: 20, right: 20, bottom: 40, left: 50 };
    const width = 800 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    const svg = d3.select(element)
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const x = d3.scaleBand()
      .domain(data.map(d => d.producto_nombre || 'Sin nombre'))
      .range([0, width])
      .padding(0.2);

    const y = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.producto_metros || 0) || 0])
      .range([height, 0]);

    // Ejes
    svg.append('g')
      .attr('transform', `translate(0, ${height})`)
      .call(d3.axisBottom(x))
      .selectAll("text")
      .attr("transform", "rotate(-45)")
      .style("text-anchor", "end");

    svg.append('g')
      .call(d3.axisLeft(y));

    // Barras
    svg.selectAll('rect')
      .data(data)
      .enter()
      .append('rect')
      .attr('x', d => x(d.producto_nombre || 'Sin nombre')!)
      .attr('y', d => y(d.producto_metros || 0))
      .attr('width', x.bandwidth())
      .attr('height', d => height - y(d.producto_metros || 0))
      .attr('fill', d => d.producto_color || '#4682b4');
  }
}
