import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatListModule } from '@angular/material/list';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { BibliaService, LivroCompleto } from '../../services/biblia.service';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-biblia',
  templateUrl: './biblia.component.html',
  styleUrls: ['./biblia.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatListModule,
    MatDialogModule,
    HeaderComponent
  ]
})
export class BibliaComponent implements OnInit {
  livros: string[] = [];
  loading = true;
  livroSelecionado: LivroCompleto | null = null;
  capituloAtual = 0;
  versaoAtual: 'avemaria' | 'jerusalem' = 'avemaria';

  constructor(
    private bibliaService: BibliaService,
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    // Verifica se há parâmetros para restaurar o estado
    this.route.queryParams.subscribe(params => {
      if (params['livro'] && params['capitulo'] !== undefined && params['versao']) {
        this.versaoAtual = params['versao'];
        this.carregarLivros().then(() => {
          this.buscarLivro(params['livro']).then(() => {
            this.capituloAtual = Number(params['capitulo']);
          });
        });
      } else {
        this.carregarLivros();
      }
    });
  }

  carregarLivros() {
    this.loading = true;
    return new Promise<void>((resolve) => {
      this.bibliaService.listarLivros(this.versaoAtual).subscribe({
        next: (livros) => {
          this.livros = livros;
          this.loading = false;
          resolve();
        },
        error: (error) => {
          console.error('Erro ao carregar livros:', error);
          alert(error.error || 'Erro ao carregar os livros');
          this.loading = false;
          resolve();
        }
      });
    });
  }

  buscarLivro(nome: string) {
    this.loading = true;
    return new Promise<void>((resolve) => {
      this.bibliaService.buscarLivro(nome, this.versaoAtual).subscribe({
        next: (livro) => {
          this.livroSelecionado = livro;
          this.loading = false;
          resolve();
        },
        error: (error) => {
          console.error('Erro ao carregar livro:', error);
          alert(error.error || 'Erro ao carregar o livro');
          this.loading = false;
          resolve();
        }
      });
    });
  }

  trocarVersao() {
    this.versaoAtual = this.versaoAtual === 'avemaria' ? 'jerusalem' : 'avemaria';
    this.livroSelecionado = null;
    this.carregarLivros();
  }

  voltarParaHome() {
    this.router.navigate(['/home']);
  }

  capituloAnterior() {
    if (this.capituloAtual > 0) {
      this.capituloAtual--;
    }
  }

  proximoCapitulo() {
    if (this.livroSelecionado && this.capituloAtual < this.livroSelecionado.chapters.length - 1) {
      this.capituloAtual++;
    }
  }

  voltarParaLivros() {
    this.livroSelecionado = null;
  }

  criarNota() {
    this.router.navigate(['/anotacoes'], {
      queryParams: {
        modo: 'criar',
        origem: 'biblia',
        livro: this.livroSelecionado?.name || '',
        capitulo: this.capituloAtual,
        versao: this.versaoAtual
      }
    });
  }
}
