import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { HeaderComponent } from '../header/header.component';
import { AiService } from '../../services/ai.service';

@Component({
  selector: 'app-meditacao',
  templateUrl: './meditacao.component.html',
  styleUrls: ['./meditacao.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatCardModule,
    HeaderComponent
  ]
})
export class MeditacaoComponent implements OnInit {
  meditacao: string = '';
  loading: boolean = true;

  constructor(
    private router: Router,
    private aiService: AiService
  ) {}

  ngOnInit() {
    this.gerarMeditacao();
  }

  gerarMeditacao() {
    this.loading = true;
    const pergunta = "Gere um texto motivacional com fundamentação bíblica segundo a igreja católica apostólica romana, use exemplo de santos";

    this.aiService.getReflexao(pergunta).subscribe({
      next: (resposta) => {
        if (typeof resposta === 'string') {
          this.meditacao = resposta;
        } else {
          console.error('Resposta inválida:', resposta);
          alert('Erro ao processar a meditação. Por favor, tente novamente.');
        }
        this.loading = false;
      },
      error: (error) => {
        console.error('Erro ao gerar meditação:', error);
        if (error.status === 401 || error.status === 403) {
          alert('Sua sessão expirou. Por favor, faça login novamente.');
          this.router.navigate(['/auth'], {
            queryParams: {
              returnUrl: this.router.url
            }
          });
        } else if (typeof error === 'string') {
          // Se o erro contiver o texto da meditação, vamos usá-lo
          this.meditacao = error;
        } else {
          alert('Erro ao gerar meditação. Por favor, tente novamente.');
        }
        this.loading = false;
      }
    });
  }

  voltarParaHome() {
    this.router.navigate(['/home']);
  }

  criarNota() {
    this.router.navigate(['/anotacoes'], {
      queryParams: {
        modo: 'criar',
        origem: 'meditacao',
        conteudo: this.meditacao
      }
    });
  }
}
