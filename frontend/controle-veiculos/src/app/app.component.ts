import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VeiculoService } from './services/veiculo.service';
import { Veiculo } from './models/veiculo.model';

@Component({
  selector: 'app-root',
  imports: [CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  veiculos: Veiculo[] = [];

  constructor(private veiculoService: VeiculoService) {}

  ngOnInit(): void {
    this.listarVeiculos();
  }

  listarVeiculos(): void {
    this.veiculoService.listarVeiculos().subscribe({
      next: (dados) => {
        this.veiculos = dados;
      },
      error: (erro) => {
        console.error('Erro ao buscar veículos:', erro);
      }
    });
  }

}
