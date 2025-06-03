import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Router, ActivatedRoute } from '@angular/router';
import { HeaderComponent } from '../../header/header.component';
import { AnotacoesService, Anotacao } from '../../../services/anotacoes.service';

@Component({
  selector: 'app-visualizar-anotacao',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    HeaderComponent
  ],
  template: `
    <div class="container">
      <app-header></app-header>

      <div class="content">
        <mat-card class="anotacao-card" *ngIf="anotacao">
          <mat-card-header>
            <mat-card-title>{{ anotacao.titulo }}</mat-card-title>
            <mat-card-subtitle>Data de Criação: {{ formatarData(anotacao.data) }}</mat-card-subtitle>
          </mat-card-header>
          <mat-card-content>
            <p class="conteudo">{{ anotacao.conteudo }}</p>
          </mat-card-content>
          <mat-card-actions>
            <button mat-button color="primary" (click)="voltar()">Voltar para Anotações</button>
          </mat-card-actions>
        </mat-card>
        <div *ngIf="loading" class="loading">
          <p>Carregando anotação...</p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .container {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      background-color: #f5f5f5;
    }

    .content {
      flex: 1;
      padding: 1rem;
      max-width: 800px;
      margin: 0 auto;
      width: 100%;
    }

    .anotacao-card {
      margin: 1rem 0;
      padding: 1rem;
    }

    .conteudo {
      white-space: pre-wrap;
      line-height: 1.6;
      margin: 1rem 0;
    }

    mat-card-header {
      margin-bottom: 1rem;
    }

    mat-card-title {
      font-size: 1.5rem;
      margin-bottom: 0.5rem;
    }

    mat-card-subtitle {
      color: rgba(0, 0, 0, 0.6);
    }

    mat-card-actions {
      padding: 1rem;
      display: flex;
      justify-content: flex-end;
    }

    .loading {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 200px;
    }
  `]
})
export class VisualizarAnotacaoComponent implements OnInit {
  anotacao: Anotacao | null = null;
  loading = true;

  constructor(
    private anotacoesService: AnotacoesService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.carregarAnotacao(id);
    } else {
      this.voltar();
    }
  }

  carregarAnotacao(id: string) {
    this.loading = true;
    this.anotacoesService.obterAnotacao(id).subscribe({
      next: (anotacao) => {
        this.anotacao = anotacao;
        this.loading = false;
      },
      error: (error) => {
        console.error('Erro ao carregar anotação:', error);
        alert(error.error || 'Erro ao carregar a anotação');
        this.loading = false;
        this.voltar();
      }
    });
  }

  formatarData(data: string | undefined): string {
    if (!data) return '';
    const dataObj = new Date(data);
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(dataObj);
  }

  voltar() {
    this.router.navigate(['/anotacoes']);
  }
} 