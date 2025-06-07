import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    HeaderComponent
  ]
})
export class HomeComponent {
  funcionalidades = [
    'Bíblia Sagrada',
    'Liturgia Diária',
    'Liturgia Eucarística',
    'Celebração da Palavra',
    'Santo do Dia',
    'Meditação',
    'Anotações'
  ];

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  logout() {
    this.authService.logout();
    this.router.navigate(['/auth']);
  }

  handleFuncionalidade(nome: string) {
    switch (nome) {
      case 'Bíblia Sagrada':
        this.router.navigate(['/biblia']);
        break;

      case 'Liturgia Diária':
        this.router.navigate(['/liturgia']);
        break;

      case 'Anotações':
        this.router.navigate(['/anotacoes']);
        break;

      case 'Meditação':
        this.router.navigate(['/meditacao']);
        break;

      case 'Santo do Dia':
        this.router.navigate(['/santo']);
        break;

      case 'Celebração da Palavra':
        this.router.navigate(['/celebracao']);
        break;

      default:
        alert(`A funcionalidade "${nome}" ainda não foi implementada.`);
    }
  }
}
