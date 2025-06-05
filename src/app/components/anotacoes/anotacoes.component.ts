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
  anotacoesFiltradas: Anotacao[] = [];
  termoBusca: string = '';
  loading = false;
  mostrarFormulario = false;
  novaAnotacao: Anotacao = {
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
        this.anotacoes = this.ordenarAnotacoes(anotacoes);
        this.aplicarFiltro(); // Aplica o filtro inicial
        this.loading = false;
      },
      error: (error) => {
        console.error('Erro ao carregar anotações:', error);
        alert(error.error || 'Erro ao carregar as anotações');
        this.loading = false;
      }
    });
  }

  ordenarAnotacoes(anotacoes: Anotacao[]): Anotacao[] {
    return anotacoes.sort((a, b) => a.titulo.localeCompare(b.titulo, 'pt-BR'));
  }

  aplicarFiltro() {
    const termo = this.termoBusca.toLowerCase().trim();
    if (!termo) {
      this.anotacoesFiltradas = [...this.anotacoes];
    } else {
      this.anotacoesFiltradas = this.anotacoes.filter(anotacao =>
        anotacao.titulo.toLowerCase().includes(termo) ||
        anotacao.conteudo.toLowerCase().includes(termo)
      );
    }
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
    if (this.modoEdicao) {
      if (confirm('Tem certeza que deseja cancelar? As alterações não serão salvas.')) {
        this.resetarFormulario();
      }
    } else {
      this.resetarFormulario();
    }
  }

  resetarFormulario() {
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
    if (!this.novaAnotacao.titulo.trim() || !this.novaAnotacao.conteudo.trim()) {
      alert('Por favor, preencha todos os campos');
      return;
    }

    this.loading = true;
    if (this.modoEdicao && this.anotacaoEmEdicao?.id) {
      const dadosAtualizacao: Anotacao = {
        id: this.anotacaoEmEdicao.id,
        titulo: this.novaAnotacao.titulo.trim(),
        conteudo: this.novaAnotacao.conteudo.trim(),
        data: this.anotacaoEmEdicao.data
      };

      this.anotacoesService.atualizarAnotacao(this.anotacaoEmEdicao.id, dadosAtualizacao).subscribe({
        next: () => {
          this.carregarAnotacoes();
          this.resetarFormulario();
          alert('Anotação atualizada com sucesso!');
        },
        error: (error) => {
          console.error('Erro ao atualizar anotação:', error);
          alert(error.error || 'Erro ao atualizar a anotação');
          this.loading = false;
        }
      });
    } else {
      const novaNota = {
        titulo: this.novaAnotacao.titulo.trim(),
        conteudo: this.novaAnotacao.conteudo.trim(),
        data: new Date().toISOString()
      };

      this.anotacoesService.criarAnotacao(novaNota).subscribe({
        next: () => {
          this.carregarAnotacoes();
          this.resetarFormulario();
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
    if (anotacao.id) {
      this.router.navigate(['/anotacoes/visualizar', anotacao.id]);
    }
  }

  editarAnotacao(anotacao: Anotacao) {
    this.loading = true;
    this.anotacoesService.obterAnotacao(anotacao.id!).subscribe({
      next: (anotacaoCompleta) => {
        this.modoEdicao = true;
        this.anotacaoEmEdicao = { ...anotacaoCompleta };
        this.novaAnotacao = {
          titulo: anotacaoCompleta.titulo,
          conteudo: anotacaoCompleta.conteudo,
          data: anotacaoCompleta.data
        };
        this.mostrarFormulario = true;
        this.loading = false;
      },
      error: (error) => {
        console.error('Erro ao carregar anotação:', error);
        alert(error.error || 'Erro ao carregar a anotação');
        this.loading = false;
      }
    });
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
