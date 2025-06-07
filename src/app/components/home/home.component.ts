import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { HeaderComponent } from '../header/header.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatGridTile } from '@angular/material/grid-list';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    HeaderComponent
  ],
  template: `
    <div class="container">
      <app-header></app-header>

      <main class="content">
        <div class="welcome-section">
          <h1>Bem-vindo ao DevoutCatholic</h1>
          <p>Seu companheiro diário para uma vida católica mais profunda</p>
        </div>

        <div class="menu-section">
          <div class="menu-grid">
            <button mat-raised-button color="primary" (click)="navegarPara('liturgia')">
              <mat-icon>book</mat-icon>
              <span>Liturgia Diária</span>
            </button>

            <button mat-raised-button color="primary" (click)="navegarPara('oracoes-eucaristicas')">
              <mat-icon>menu_book</mat-icon>
              <span>Orações Eucarísticas</span>
            </button>

            <button mat-raised-button color="primary" (click)="navegarPara('celebracao')">
              <mat-icon>church</mat-icon>
              <span>Celebração da Palavra</span>
            </button>

            <button mat-raised-button color="primary" (click)="navegarPara('meditacao')">
              <mat-icon>self_improvement</mat-icon>
              <span>Meditação</span>
            </button>

            <button mat-raised-button color="primary" (click)="navegarPara('santo')">
              <mat-icon>person</mat-icon>
              <span>Santo do Dia</span>
            </button>
          </div>
        </div>
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
      padding: 2rem;
      max-width: 800px;
      margin: 0 auto;
      width: 100%;
    }

    .welcome-section {
      text-align: center;
      margin-bottom: 3rem;
    }

    .welcome-section h1 {
      color: #3f51b5;
      margin: 0;
      font-size: 2rem;
      font-weight: 500;
    }

    .welcome-section p {
      color: rgba(0, 0, 0, 0.6);
      margin: 1rem 0 0;
      font-size: 1.1rem;
    }

    .menu-section {
      padding: 1rem;
    }

    .menu-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1rem;
    }

    button[mat-raised-button] {
      width: 100%;
      height: 100px;
      font-size: 1rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      padding: 1rem;
      white-space: normal;
      line-height: 1.2;
    }

    .mat-icon {
      font-size: 2rem;
      width: 2rem;
      height: 2rem;
    }

    @media (max-width: 600px) {
      .content {
        padding: 1rem;
      }

      .menu-grid {
        grid-template-columns: 1fr;
      }

      button[mat-raised-button] {
        height: 80px;
      }
    }
  `]
})
export class HomeComponent {
  constructor(private router: Router) {}

  navegarPara(rota: string) {
    this.router.navigate(['/' + rota]);
  }
}
