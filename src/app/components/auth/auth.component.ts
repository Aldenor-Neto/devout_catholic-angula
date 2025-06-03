import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatSlideToggleModule
  ]
})
export class AuthComponent {
  nome: string = '';
  email: string = '';
  senha: string = '';
  modoCadastro: boolean = false;
  mostrarSenha: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  handleLogin() {
    this.authService.login(this.email, this.senha).subscribe({
      next: (response) => {
        console.log('Login bem-sucedido:', response);
        this.router.navigate(['/home']);
      },
      error: (error) => {
        console.error('Erro no login:', error);
        alert(error.error || 'Erro ao fazer login');
      }
    });
  }

  handleCadastro() {
    if (!this.modoCadastro) {
      this.modoCadastro = true;
      return;
    }

    this.authService.register(this.nome, this.email, this.senha).subscribe({
      next: (response) => {
        console.log('Cadastro bem-sucedido:', response);
        alert(`${response.mensagem} para: ${response.email}`);
        this.resetForm();
        this.modoCadastro = false;
      },
      error: (error) => {
        console.error('Erro no cadastro:', error);
        alert(error.error || 'Erro ao fazer cadastro');
      }
    });
  }

  resetForm() {
    this.nome = '';
    this.email = '';
    this.senha = '';
  }
} 