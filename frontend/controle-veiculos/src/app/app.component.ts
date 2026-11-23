import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VeiculoService } from './services/veiculo.service';
import { Veiculo } from './models/veiculo.model';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-root',
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
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
      },
    });
  }

  cadastrarVeiculo(): void {
    if (this.veiculoEditandoId !== null) {
      this.veiculoService
        .atualizarVeiculo(this.veiculoEditandoId, this.novoVeiculo)
        .subscribe({
          next: (veiculoAtualizado) => {
            const indice = this.veiculos.findIndex(
              (veiculo) => veiculo.id === this.veiculoEditandoId,
            );

            this.veiculos[indice] = veiculoAtualizado;

            this.finalizarFormulario();

            Swal.fire({
              title: 'Sucesso!',
              text: 'Veículo atualizado com sucesso!',
              icon: 'success',
              confirmButtonText: 'OK',
              confirmButtonColor: '#243b53',
            });
          },
          error: (erro) => {
            console.error('Erro ao atualizar veículo:', erro);
          },
        });
    } else {
      this.veiculoService.cadastrarVeiculo(this.novoVeiculo).subscribe({
        next: (veiculoCadastrado) => {
          this.veiculos.push(veiculoCadastrado);

          this.finalizarFormulario();

          Swal.fire({
            title: 'Sucesso!',
            text: 'Veículo cadastrado com sucesso!',
            icon: 'success',
            confirmButtonText: 'OK',
            confirmButtonColor: '#243b53',
          });
        },
        error: (erro) => {
          console.error('Erro ao cadastrar veículo:', erro);
        },
      });
    }
  }

  editarVeiculo(veiculo: Veiculo): void {
    this.veiculoEditandoId = veiculo.id;

    this.novoVeiculo = { ...veiculo };

    this.mostrarFormulario = true;
  }

  mostrarFormulario = false;
  veiculoEditandoId: number | null = null;

  novoVeiculo: Veiculo = {
    id: 0,
    marca: '',
    modelo: '',
    ano: 0,
    placa: '',
    cor: '',
    status: 'Disponível',
  };

  finalizarFormulario(): void {
    this.novoVeiculo = {
      id: 0,
      marca: '',
      modelo: '',
      ano: 0,
      placa: '',
      cor: '',
      status: 'Disponível',
    };

    this.veiculoEditandoId = null;
    this.mostrarFormulario = false;
  }

  excluirVeiculo(id: number): void {
    Swal.fire({
      title: 'Deseja excluir este veículo?',
      text: 'Essa ação não poderá ser desfeita.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim, excluir',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
    }).then((resultado) => {
      if (resultado.isConfirmed) {
        this.veiculoService.excluirVeiculo(id).subscribe({
          next: () => {
            this.veiculos = this.veiculos.filter(
              (veiculo) => veiculo.id !== id,
            );

            Swal.fire(
              'Excluído!',
              'O veículo foi excluído com sucesso.',
              'success',
            );
          },
          error: (erro) => {
            console.error('Erro ao excluir veículo:', erro);

            Swal.fire('Erro!', 'Não foi possível excluir o veículo.', 'error');
          },
        });
      }
    });
  }
}
