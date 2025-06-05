import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.carregarLivros();
  }

  carregarLivros() {
    this.loading = true;
    this.bibliaService.listarLivros(this.versaoAtual).subscribe({
      next: (livros) => {
        this.livros = livros;
        this.loading = false;
      },
      error: (error) => {
        console.error('Erro ao carregar livros:', error);
        alert(error.error || 'Erro ao carregar os livros');
        this.loading = false;
      }
    });
  }

  buscarLivro(nome: string) {
    this.loading = true;
    this.bibliaService.buscarLivro(nome, this.versaoAtual).subscribe({
      next: (livro) => {
        this.livroSelecionado = livro;
        this.capituloAtual = 0;
        this.loading = false;
      },
      error: (error) => {
        console.error('Erro ao carregar livro:', error);
        alert(error.error || 'Erro ao carregar o livro');
        this.loading = false;
      }
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
}
