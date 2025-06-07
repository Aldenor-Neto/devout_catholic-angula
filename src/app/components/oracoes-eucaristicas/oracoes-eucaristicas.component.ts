import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDividerModule } from '@angular/material/divider';
import { HeaderComponent } from '../header/header.component';

interface OracaoEucaristica {
  titulo: string;
  conteudo: string;
}

@Component({
  selector: 'app-oracoes-eucaristicas',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatExpansionModule,
    MatDividerModule,
    HeaderComponent
  ],
  template: `
    <div class="container">
      <app-header></app-header>

      <main class="content">
        <div class="toolbar">
          <button mat-icon-button (click)="voltarParaHome()" [attr.aria-label]="'Voltar para a página inicial'">
            <mat-icon>arrow_back</mat-icon>
          </button>
          <span>Orações Eucarísticas</span>
        </div>

        <mat-card class="intro-card">
          <mat-card-content>
            <h2>Orações Eucarísticas da Santa Missa</h2>
            <p>
              As Orações Eucarísticas são o coração da celebração da Santa Missa,
              onde se realiza o memorial do sacrifício de Cristo e sua oferta ao Pai.
              Escolha uma das orações abaixo para meditar e aprofundar sua participação na liturgia.
            </p>
          </mat-card-content>
        </mat-card>

        <mat-accordion>
          <mat-expansion-panel *ngFor="let oracao of oracoesEucaristicas; let i = index">
            <mat-expansion-panel-header>
              <mat-panel-title>
                {{ oracao.titulo }}
              </mat-panel-title>
            </mat-expansion-panel-header>

            <div class="oracao-content markdown-content" [innerHTML]="formatarConteudo(oracao.conteudo)">
            </div>
          </mat-expansion-panel>
        </mat-accordion>
      </main>
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

    .toolbar {
      display: flex;
      align-items: center;
      padding: 8px;
      gap: 8px;
      margin-bottom: 1rem;
    }

    .intro-card {
      margin-bottom: 2rem;
      background-color: #fff;
      border-radius: 8px;
    }

    .intro-card h2 {
      color: #3f51b5;
      margin: 0 0 1rem;
      font-size: 1.5rem;
      font-weight: 500;
    }

    .intro-card p {
      color: rgba(0, 0, 0, 0.7);
      line-height: 1.6;
      margin: 0;
    }

    mat-expansion-panel {
      margin-bottom: 1rem;
      background-color: white;
    }

    mat-expansion-panel-header {
      height: auto !important;
      padding: 1rem !important;
    }

    mat-panel-title {
      color: #3f51b5;
      font-size: 1.2rem;
      font-weight: 500;
    }

    .oracao-content {
      line-height: 1.8;
      color: rgba(0, 0, 0, 0.87);
      padding: 1rem 0;
    }

    .oracao-content h1 {
      color: #3f51b5;
      font-size: 1.8rem;
      margin: 2rem 0 1rem;
      text-align: center;
    }

    .oracao-content h2 {
      color: #3f51b5;
      font-size: 1.4rem;
      margin: 1.5rem 0 1rem;
    }

    .oracao-content h3 {
      color: #3f51b5;
      font-size: 1.2rem;
      margin: 1rem 0 0.5rem;
    }

    .oracao-content p {
      margin-bottom: 1rem;
    }

    .oracao-content strong {
      color: #1a237e;
      font-weight: 600;
      display: block;
      margin: 0.5rem 0;
    }

    .oracao-content blockquote {
      margin: 1rem 0;
      padding: 1rem;
      background-color: #f8f9fa;
      border-left: 4px solid #3f51b5;
      font-style: italic;
    }

    @media (max-width: 600px) {
      .content {
        padding: 1rem 0.5rem;
      }
    }

    .markdown-content {
      font-size: 1rem;
      line-height: 1.8;
    }

    .markdown-content strong {
      color: #1a237e;
      font-weight: 600;
      display: block;
      margin: 0.5rem 0;
      padding: 0.5rem;
      background-color: #f5f5f5;
      border-radius: 4px;
    }
  `]
})
export class OracoesEucaristicasComponent implements OnInit {
  oracoesEucaristicas: OracaoEucaristica[] = [];

  constructor(private router: Router) {}

  ngOnInit() {
    // Carregar o conteúdo do arquivo markdown
    fetch('/assets/oracoes_eucaristicas.md')
      .then(response => response.text())
      .then(text => {
        // Dividir o texto em seções por oração
        const sections = text.split('---').filter(section => section.trim());

        this.oracoesEucaristicas = sections.map(section => {
          const lines = section.trim().split('\n');
          const titulo = lines[0].replace('#', '').trim();
          const conteudo = lines.slice(1).join('\n').trim();

          return { titulo, conteudo };
        });
      })
      .catch(error => {
        console.error('Erro ao carregar as orações:', error);
      });
  }

  formatarConteudo(conteudo: string): string {
    return conteudo
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') // Negrito (primeira transformação)
      .replace(/\n\n/g, '</p><p>') // Parágrafos
      .replace(/\n/g, '<br>') // Quebras de linha
      .replace(/\*(.*?)\*/g, '<em>$1</em>') // Itálico
      .replace(/^# (.*?)$/gm, '<h1>$1</h1>') // Títulos H1
      .replace(/^## (.*?)$/gm, '<h2>$1</h2>') // Títulos H2
      .replace(/^### (.*?)$/gm, '<h3>$1</h3>') // Títulos H3
      .replace(/^> (.*?)$/gm, '<blockquote>$1</blockquote>') // Citações
      .replace(/^- (.*?)$/gm, '<li>$1</li>') // Lista não ordenada
      .replace(/<li>(.*?)<\/li>/g, '<ul><li>$1</li></ul>') // Wrapper para lista
      .replace(/___(.*?)___/g, '<hr>'); // Linha horizontal
  }

  voltarParaHome() {
    this.router.navigate(['/home']);
  }
}
