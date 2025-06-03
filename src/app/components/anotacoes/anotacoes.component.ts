import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HeaderComponent } from '../header/header.component';
import { AnotacoesService, Anotacao } from '../../services/anotacoes.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-anotacoes',
  templateUrl: './anotacoes.component.html',
  styleUrls: ['./anotacoes.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    MatProgressSpinnerModule,
    HeaderComponent
  ]
})
export class AnotacoesComponent implements OnInit {
  anotacoes: Anotacao[] = [];
  loading = false;
  mostrarFormulario = false;
  mostrarModal = false;
  anotacaoVisualizada: Anotacao | null = null;
  novaAnotacao: Omit<Anotacao, 'id'> = {
    titulo: '',
    conteudo: '',
    data: new Date().toISOString()
  };
  modoEdicao = false;
  anotacaoEmEdicao: Anotacao | null = null;

  constructor(
    private anotacoesService: AnotacoesService,
    private router: Router
  ) { }

  ngOnInit() {
    this.carregarAnotacoes();
  }

  carregarAnotacoes() {
    this.loading = true;
    this.anotacoesService.listarAnotacoes().subscribe({
      next: (anotacoes) => {
        this.anotacoes = anotacoes;
        this.loading = false;
      },
      error: (error) => {
        console.error('Erro ao carregar anotações:', error);
        alert(error.error || 'Erro ao carregar as anotações');
        this.loading = false;
      }
    });
  }

  abrirFormulario() {
    this.mostrarFormulario = true;
    this.modoEdicao = false;
    this.novaAnotacao = {
      titulo: '',
      conteudo: '',
      data: new Date().toISOString()
    };
  }

  fecharFormulario() {
    this.mostrarFormulario = false;
    this.modoEdicao = false;
    this.anotacaoEmEdicao = null;
    this.novaAnotacao = {
      titulo: '',
      conteudo: '',
      data: new Date().toISOString()
    };
  }

  salvarAnotacao() {
    if (!this.novaAnotacao.titulo || !this.novaAnotacao.conteudo) {
      alert('Por favor, preencha todos os campos');
      return;
    }

    this.loading = true;
    if (this.modoEdicao && this.anotacaoEmEdicao) {
      this.anotacoesService.atualizarAnotacao(this.anotacaoEmEdicao.id!, this.novaAnotacao).subscribe({
        next: () => {
          this.carregarAnotacoes();
          this.fecharFormulario();
          alert('Anotação atualizada com sucesso!');
        },
        error: (error) => {
          console.error('Erro ao atualizar anotação:', error);
          alert(error.error || 'Erro ao atualizar a anotação');
          this.loading = false;
        }
      });
    } else {
      this.anotacoesService.criarAnotacao(this.novaAnotacao).subscribe({
        next: () => {
          this.carregarAnotacoes();
          this.fecharFormulario();
          alert('Anotação criada com sucesso!');
        },
        error: (error) => {
          console.error('Erro ao criar anotação:', error);
          alert(error.error || 'Erro ao criar a anotação');
          this.loading = false;
        }
      });
    }
  }

  visualizarAnotacao(anotacao: Anotacao) {
    this.anotacaoVisualizada = anotacao;
    this.mostrarModal = true;
  }

  fecharVisualizacao() {
    this.mostrarModal = false;
    this.anotacaoVisualizada = null;
  }

  editarAnotacao(anotacao: Anotacao) {
    this.modoEdicao = true;
    this.anotacaoEmEdicao = { ...anotacao };
    this.novaAnotacao = {
      titulo: anotacao.titulo,
      conteudo: anotacao.conteudo,
      data: anotacao.data
    };
    this.mostrarFormulario = true;
  }

  excluirAnotacao(id: string) {
    if (confirm('Tem certeza que deseja excluir esta anotação?')) {
      this.loading = true;
      this.anotacoesService.excluirAnotacao(id).subscribe({
        next: () => {
          this.carregarAnotacoes();
          alert('Anotação excluída com sucesso!');
        },
        error: (error) => {
          console.error('Erro ao excluir anotação:', error);
          alert(error.error || 'Erro ao excluir a anotação');
          this.loading = false;
        }
      });
    }
  }

  voltarParaHome() {
    this.router.navigate(['/home']);
  }
} 